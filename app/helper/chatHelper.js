'use strict';

var dbhelp = require("./dbHelper"),
    db = dbhelp.db,
    mongoose = dbhelp.mongoose;

/*chat schema*/
var chatSchema = new mongoose.Schema({
    chatUser: String,
    chatTime: { type: Date, expires: 60 * 60 * 24 * 7 },//msg expired in a week
    chatMsg: String
});

var chatModel = mongoose.model('Chat', chatSchema);

module.exports = {
    Chat: chatModel,
    GetChats: function (callback) { 
        chatModel.find({},'chatUser chatTime chatMsg', {limit: 100}).sort({chatTime: -1}).exec(callback);
    },
    AddChat: function (chat, callback) {
        var c = new chatModel({
            chatUser: chat.chatUser,
            chatTime: chat.chatTime,
            chatMsg: chat.chatMsg
        });

        c.save(callback);
    }
}