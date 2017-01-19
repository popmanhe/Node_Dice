'use strict';

var _chatHelper = require('../helper/chatHelper');

var _chatHelper2 = _interopRequireDefault(_chatHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (io) {

    io.on('connection', function (socket) {
        var session = socket.handshake.session;

        socket.on('getChats', function () {
            _chatHelper2.default.GetChats(function (err, chats) {
                if (err) return console.error('getChats error:' + err);
                socket.emit('getChats', chats);
            });
        });

        socket.on('sendChat', function (chat) {
            chat.chatUser = session.username;
            chat.chatTime = new Date();
            _chatHelper2.default.AddChat(chat, function (err) {
                if (err) return console.error('sendChat error:' + err);
            });
            socket.broadcast.emit('recvChat', {
                chatUser: chat.chatUser,
                chatTime: chat.chatTime,
                chatMsg: chat.chatMsg
            });
        });
    });
};
//# sourceMappingURL=s_chat.js.map