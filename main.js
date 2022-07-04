const socket = io('http://localhost:8000');

const form = document.getElementById('form');
const input = document.getElementById('input');
const container = document.getElementById('container');
const audio = new Audio('ting.mp3');

const append = (message, position) =>{
    const messgeElement = document.createElement('div');
    messgeElement.innerText = message;
    messgeElement.classList.add(position);
    container.append(messgeElement)
    if(position === 'left'){
        audio.play()
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = input.value;
    append(`You : ${message}`, 'right');
    socket.emit('send', message);
    input.value = ''
})

const name = prompt("Enter your name");
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'mid');
});

socket.on('receive', data =>{
    append(`${data.name} : ${data.message}`, 'left');
});

socket.on('leave', name =>{
    append(`${name} left the chat`, 'mid');
})