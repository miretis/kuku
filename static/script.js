const socket = io();

const messages = document.getElementById('message');
const form = document.getElementById('form');
const input = document.getElementById('input');

form.addEventListener('submit', function(e){
    e.preventDefault();
    if(input.value){
        socket.emit('new_message', input_value);
        input.value = '';
    }
})