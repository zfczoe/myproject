exports.chatServer = function(server) {
    var sio = require('socket.io');
    var io = sio.listen(server);
    var names = [];
    io.sockets.on('connection', function(socket){
        socket.on('login', function(name){
            for (var i = 0; i < names.length; i++) {
                if(names[i] == name){
                    socket.emit('duplicate');
                    return;
                }
            }
            names.push(name);
            io.sockets.emit('login', name);
            io.sockets.emit('sendClients', names);
        });
        socket.on('chat', function(data){
            io.sockets.emit('chat', data);
        });
        socket.on('logout', function(name){
            for (var i = 0; i < names.length; i++) {
                if(names[i] == name){
                    names.splice(i, 1);
                    break;
                }
            }
            socket.broadcast.emit('logout', name);
            io.sockets.emit('sendClients', names);
        });
    });
}


