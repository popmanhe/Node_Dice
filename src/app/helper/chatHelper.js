'use strict';

import dbhelp from './dbHelper';
const db = dbhelp.db,
    mongoose = dbhelp.mongoose;

/*chat schema*/
const chatSchema = new mongoose.Schema({
    chatUser: String,
    chatTime: { type: Date, expires: 60 * 60 * 24 * 7 },//msg expired in a week
    chatMsg: String
});

const chatModel = mongoose.model('Chat', chatSchema);

module.exports = {
    Chat: chatModel,
    GetChats: (callback) => { 
        chatModel.find({},'chatUser chatTime chatMsg', {limit: 100}).sort({chatTime: -1}).exec(callback);
    },
    AddChat: (chat, callback) =>{
        var c = new chatModel({
            chatUser: chat.chatUser,
            chatTime: chat.chatTime,
            chatMsg: chat.chatMsg
        });

        c.save(callback);
    }
}