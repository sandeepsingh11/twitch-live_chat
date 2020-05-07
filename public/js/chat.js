$(document).ready(function() {
    var path = $(location).attr('pathname');
    // specify chat server
    var socket = io(path);

    function getServer() {
        // get path
        var path = $(location).attr('pathname');
        // set it
        socket = io(path);

        return socket;
    }

    // new user
    $('#usernameForm').submit(function(e) {
        // get username
        var username = $('#username').val();

        // hide username prompt
        var usernameContainer = $('#usernameContainer');
        $(usernameContainer).css('display', 'none');
        $(usernameContainer).css('z-index', '-1');

        // goes to: ../../app.js
        socket.emit('new user', username );

        // prevent page refresh
        return false;
    });



    // when user submits a message
    $('#messageForm').submit(function(e) {
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
    socket.on('chat message', function(user, message) {
        var chatMessage = `${user}: ${message}`;

        // append new chat message
        $('#messages').append($('<p>').text(chatMessage));
    });

    // update live users display func
    socket.on('refresh users', function(liveUsers) {
        console.log(liveUsers);

        // remove previous user list
		$('#userList').children().remove();

        // populate the user list
        for (user of liveUsers) {
            // update live user list
            $('#userList').append($('<li>').text(user));
        }
    });
});