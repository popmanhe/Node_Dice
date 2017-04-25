import chatModel from '../Models/chatModel';
import logger from '../helper/logger';

const chat = (io) => {
    io.on('connection', (socket) => {
        socket.on('GET_CHATS', async () => {
            try {
                const messages = await chatModel.GetChats();
                socket.emit('action', { type: 'RECV_MESSAGES', messages });
            }
            catch (err) {
                logger.error(err);
            }
        });

        socket.on('SEND_MESSAGE', async (chat) => {
            if (socket.user) {
                chat.userName = socket.user.userName;
                chat.timeStamp = new Date();
                try {
                    await chatModel.AddChat(chat);
                    io.emit('action', {
                        type: 'RECV_MESSAGE', message: {
                            userName: chat.userName,
                            timeStamp: chat.timeStamp,
                            message: chat.message
                        }
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