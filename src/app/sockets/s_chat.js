import chatHelper from '../helper/chatHelper';
module.exports =  (io) => {
    
    io.on('connection', (socket) => {
        let session = socket.handshake.session;
        
        socket.on('getChats',  () => {
            chatHelper.GetChats( (err, chats) => {
                if (err) return console.error('getChats error:' + err);
                socket.emit('getChats', chats);
            });
        });

        socket.on('sendChat',  (chat) =>{
            chat.chatUser = session.username;
            chat.chatTime = new Date();
            chatHelper.AddChat(chat,  (err) => {
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