const express = require('express');
const socket = require('socket.io');

// App setup
const app = express();
const server = app.listen(process.env.PORT || 8080, function(){
    console.log('listening for requests on port 8080,');
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
const io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});
