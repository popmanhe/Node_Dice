var chatVM = {
    enterMsg: ko.observable(''),
    chatButtonEnable: ko.observable(1),
    sendMsg: function () {
        if (this.enterMsg().length > 0) {
            socket.emit('sendChat', { chatMsg: this.enterMsg() });
            if (chatArray().length > 100)
                chatArray.shift();
            chatArray.push({ chatUser: '' , chatTime: moment(new Date()).format('YYYY-MM-DD HH:mm'), chatMsg: this.enterMsg() });
            this.chatButtonEnable(0);
            this.enterMsg('');
            scrollToBottom();
            //Pause 5 seconds to enter next message
            setTimeout(function () { chatVM.chatButtonEnable(1); }, 1000 * 5);
        }
    },
    chatFadeIn: function (element, index, data) {
        //add fadein effect when new chat comes in
        $(element).hide();
        $(element).fadeIn(800);
    }
};
var chatArray = ko.observableArray();

$(function () {
    ko.applyBindings(chatVM, document.getElementById("chatBox"));
    socket.emit('getChats', '');
    socket.on('getChats', function (result) {
        if (result.length > 0) {
            $(result).each(function (i) {
                chatArray.unshift({ chatUser: result[i].chatUser, chatTime: moment(result[i].chatTime).format('YYYY-MM-DD HH:mm'), chatMsg: result[i].chatMsg });
            })
        }
        scrollToBottom();
    });
    socket.on('recvChat', function (result) {
        if (chatArray().length > 100)
            chatArray.shift();
        chatArray.push({ chatUser: result.chatUser, chatTime: moment(result.chatTime).format('YYYY-MM-DD HH:mm'), chatMsg: result.chatMsg });
        var container = $('#chatList')
        container.animate({ scrollTop: container.height() + 20000 }, 1000);
    });
});

function scrollToBottom() {
    var container = $('#chatList')
    container.animate({ scrollTop: container.height() + 20000 }, 1000);
}