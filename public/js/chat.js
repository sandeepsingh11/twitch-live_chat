$(document).ready(function() {
    var socket = io();

    // when user submits a message
    $('form').submit(function(e) {
        // get message
        var inputVal = $('#message').val();

        // goes to: ../../app.js
        socket.emit('chat message', inputVal );

        // empty input field
        $('#message').val('');

        // prevent page refresh
        return false;
    });

    // new chat message func
    socket.on('chat message', function(message) {
        // append new chat message
        $('#messages').append($('<p>').text(message));
    });
});