module.exports = function (io) {
    
    io.on('connection', function (socket) {
        var session = socket.handshake.session;    
        socket.on('sendChat', function (chat) {
            socket.broadcast.emit('recvChat', {
                chatUser: '', 
                chatTime: new Date(), 
                chatMsg: chat.msg
            })
        });
    });

}