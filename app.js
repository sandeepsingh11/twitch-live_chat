const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// custom namespaces (chat servers)
const catServer = io.of('/cat');
const birdServer = io.of('/bird');
const dogServer = io.of('/dog');



// register public folder
app.use(express.static(__dirname + '/public/') );

// home route
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html') );
app.get('/cat', (req, res) => res.sendFile(__dirname + '/public/cat.html') );



// GLOBAL - live users
var liveUsers = [];

// socket.io connection
io.on('connection', (socket) => {
    console.log('a user has connected');

    // user has enter the chat
    socket.on('new user', function(username) {
        socket.username = username;

        // update live users
        liveUsers.push(username);


        // update user display
        // goes to: ./public/js/chat.js
        io.emit('refresh users', liveUsers);
    });

    // new chat message
    socket.on('chat message', function(message) {
        
        // goes to: ./public/js/chat.js
        io.emit('chat message', socket.username, message);
    });

    socket.on('disconnect', function() {
        console.log('a user has disconnected');
    });
});


// cat chat server
catServer.on('connection', (socket) => {
    console.log('a user has connected');

    // user has enter the chat
    socket.on('new user', function(username) {
        socket.username = username;

        // update live users
        liveUsers.push(username);


        // update user display
        // goes to: ./public/js/chat.js
        catServer.emit('refresh users', liveUsers);
    });

    // new chat message
    socket.on('chat message', function(message) {
        
        // goes to: ./public/js/chat.js
        catServer.emit('chat message', socket.username, message);
    });

    socket.on('disconnect', function() {
        console.log('a user has disconnected');
    });
});






// port stuff
const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server on port ${port}`));