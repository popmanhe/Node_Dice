import chatHelper from '../helper/chatHelper';
import logger from '../helper/logger';
const chat = (io) => {
    
    io.on('connection', (socket) => {
        let session = socket.handshake.session;
        
        socket.on('getChats',  () => {
            chatHelper.GetChats( (err, chats) => {
                if (err) return console.error('getChats error:' + err);
                socket.emit('getChats', chats);
            });
        });

        socket.on('sendChat',  (chat) =>{

            logger.info('chat: ' + chat.message);
            
            chat.chatUser = session.username;
            chat.chatTime = new Date();
            chatHelper.AddChat(chat,  (err) => {
                if (err) return console.error('sendChat error:' + err);
            });
            socket.broadcast.emit('recvChat', {
                chatUser: chat.chatUser, 
                chatTime: chat.chatTime, 
                chatMsg: chat.message
            });
        });
    });

};

export default chat;