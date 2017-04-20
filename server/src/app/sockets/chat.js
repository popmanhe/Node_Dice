import chatModel from '../Models/chatModel';
import logger from '../helper/logger';

const chat = (io) => {
    io.on('connection', (socket) => {
        socket.on('getChats', async () => {
            try {
                const chats = await chatModel.GetChats();
                socket.emit('getChats', chats);
            }
            catch (err) {
                logger.error(err);
            }
        });

        socket.on('sendChat',async (chat) => {
            if (socket.user) {
                chat.userName = socket.user.userName;
                chat.timeStamp = new Date();
                try {
                    await chatModel.AddChat(chat);
                    io.emit('recvChat', {
                        userName: chat.userName,
                        timeStamp: chat.timeStamp,
                        message: chat.message
                    });
                }
                catch (err) {
                    logger.error(err);
                }
            }
        });
    });

};

export default chat;