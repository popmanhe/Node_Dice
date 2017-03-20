'use strict';

import dbhelp from './dbHelper';
const mongoose = dbhelp.mongoose;
mongoose.Promise = global.Promise;
/*chat schema*/
const chatSchema = new mongoose.Schema({
    chatUser: String,
    chatTime: { type: Date, expires: 60 * 60 * 24 * 7 },//msg expired in a week
    chatMsg: String
});

const chatModel = mongoose.model('Chat', chatSchema);

export default {
    Chat: chatModel,
    GetChats: (callback) => { 
        chatModel.find({},'chatUser chatTime chatMsg', {limit: 100}).sort({chatTime: -1}).exec(callback);
    },
    AddChat: (chat, callback) =>{
        const c = new chatModel({
            chatUser: chat.chatUser,
            chatTime: chat.chatTime,
            chatMsg: chat.chatMsg
        });

        c.save(callback);
    }
};