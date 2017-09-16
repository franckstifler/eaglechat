const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile('index.html');
});


io.on('connection', function(socket) {
    console.log('client connected');
    socket.on('send_message', function(data) {
        console.log(data);
        socket.broadcast.emit('receive_message', data);
    });
});


const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('server started');
});

