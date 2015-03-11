var chatVM = {
    enterMsg: ko.observable(''),
    chatButtonEnable: ko.observable(1),
    sendMsg: function () {
        if (this.enterMsg().length > 0) {
            socket.emit('sendChat', { msg: this.enterMsg() });
            if (chatArray().length > 100)
                chatArray.shift();
            chatArray.push({ chatUser: 'Neo', chatTime: moment(new Date()).format('YYYY-MM-DD HH:mm'), chatMsg: this.enterMsg() });
            this.chatButtonEnable(0);
            this.enterMsg('');
            var container=$('#chatList')
            container.animate({ scrollTop: container.height() + 20000 }, 1000);
            //Pause 5 seconds to enter next message
            setTimeout(function () { chatVM.chatButtonEnable(1); }, 1000 * 5);
        }
    }
};
var chatArray = ko.observableArray();

$(function () {
    ko.applyBindings(chatVM, document.getElementById("chatBox"));
    socket.on('recvChat', function (result) {
        if (chatArray().length > 100)
            chatArray.shift();
        chatArray.push({ chatUser: 'Neo', chatTime: moment(result.chatTime).format('YYYY-MM-DD HH:mm'), chatMsg: result.chatMsg });
        var container = $('#chatList')
        container.animate({ scrollTop: container.height() + 20000 }, 1000);
    });
});