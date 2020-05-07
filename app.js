const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);



// register public folder
app.use(express.static(__dirname + '/public/') );

// home route
app.get('/', (req, res) => res.sendFile(__dirname + './public/index.html') );



// socket.io connection
io.on('connection', (socket) => {
    console.log('a user has connected');

    // new chat message
    socket.on('chat message', function(message) {
        // goes to: ./public/js/chat.js
        io.emit('chat message', message);
    })

    socket.on('disconnect', function() {
        console.log('a user has disconnected');
    });
});






// port stuff
const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server on port ${port}`));