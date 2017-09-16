var socket = io();

function renderHTML(name, message, myMessage) {
    const template = 
    `<div class="content">
            <div class="meta">${name}</div>
            <div class="description">
            ${message}
            <i class="copy icon right" onclick="handleCopy(event)">
    </div>`
    const card = document.createElement('div');
    myMessage ? card.className = 'card orange' : card.className = 'card green';
    card.innerHTML = template;
    document.getElementById('messages').appendChild(card);
}

function handleCopy(event) {
    alert('copy to clipboard');
}

document.querySelector('button').addEventListener('click', function(event) {
    event.preventDefault();
    let messageNode = document.getElementById('message');
    let nameNode = document.getElementById('name');
    let message = messageNode.value.trim();
    let name = nameNode.value.trim() || 'Anonymous';
    if (message.length > 0) {
        socket.emit('send_message', {message, name});
        renderHTML(name, message, true)
    }
    
});

socket.on('receive_message', function(data) {
    renderHTML(data.name, data.message);
})