import chatModel from '../Models/chatModel';
// import logger from '../helper/logger';

const chat = (io) => {


    io.on('connection', (socket) => {
        socket.on('getChats', () => {
            chatModel.GetChats((err, chats) => {
                if (err) return console.error('getChats error:' + err);
                socket.emit('getChats', chats);
            });
        });

        socket.on('sendChat', (chat) => {
            if (socket.user) {
                chat.userName = socket.user.userName;
                chat.timeStamp = new Date();
                chatModel.AddChat(chat, (err) => {
                    if (err) return console.error('sendChat error:' + err);
                });
                io.emit('recvChat', {
                    userName: chat.userName, 
                    timeStamp: chat.timeStamp,
                    message: chat.message
                });
            }
        });
    });

};

export default chat;