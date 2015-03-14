var chatHelper = require('../helper/chatHelper');
module.exports = function (io) {
    
    io.on('connection', function (socket) {
        var session = socket.handshake.session;
        
        socket.on('getChats', function () {
            chatHelper.GetChats(function (err, chats) {
                if (err) return console.error('getChats error:' + err);
                socket.emit('getChats', chats);
            });
        });

        socket.on('sendChat', function (chat) {
            chat.chatUser = session.username;
            chat.chatTime = new Date();
            chatHelper.AddChat(chat, function (err) {
                if (err) return console.error('sendChat error:' + err);
            });
            socket.broadcast.emit('recvChat', {
                chatUser: chat.chatUser, 
                chatTime: chat.chatTime, 
                chatMsg: chat.chatMsg
            })
        });
    });

}