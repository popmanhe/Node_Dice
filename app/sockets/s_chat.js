var chatHelper = require('../helper/chatHelper');
module.exports = function (io) {
    
    io.on('connection', function (socket) {
               
        socket.on('getChats', function () {
            chatHelper.getChats(function (err, chats) {
                if (err) return console.error('getChats error:' + err);
                socket.emit('getChats', chats);
            });
        });

        socket.on('sendChat', function (chat) {
            chat.chatTime = new Date();
            chatHelper.addChat(chat, function (err) {
                if (err) return console.error('sendChat error:' + err);
            });
            socket.broadcast.emit('recvChat', {
                chatUser: '', 
                chatTime: chat.chatTime, 
                chatMsg: chat.chatMsg
            })
        });
    });

}