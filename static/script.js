const socket = io();

const messages = document.getElementById('message');
const form = document.getElementById('form');
const input = document.getElementById('input');

form.addEventListener('submit', function(e){
    e.preventDefault();
    if(input.value){
        socket.emit('new_message', input.value);
        input.value = '';
    }
})

socket.on('message', function(msg){
    var item = DocumentTimeline.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});