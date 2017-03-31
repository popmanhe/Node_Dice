import dbConnect from './dbConnect';

const mongoose = dbConnect.mongoose;
mongoose.Promise = global.Promise;
/*chat schema*/
const chatSchema = new mongoose.Schema({
    userName: String,
    timeStamp: { type: Date, expires: 60 * 60 * 24 * 7 },//msg expired in a week
    message: String
});

const chatModel = mongoose.model('Chat', chatSchema);

export default {
    Chat: chatModel,
    GetChats: (callback) => { 
        chatModel.find({},'userName timeStamp message').sort({timeStamp: -1}).limit(100).exec(callback);
    },
    AddChat: (chat, callback) =>{
        const c = new chatModel({
            userName: chat.userName,
            timeStamp: chat.timeStamp,
            message: chat.message
        });

        c.save(callback);
    }
};