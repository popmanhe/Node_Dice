var chatVM = {
    enterMsg: ko.observable(''),
    chatButtonEnable: ko.observable(1),
    sendMsg: function () {
        socket.emit('sendChat', { msg: this.enterMsg() });
        chatArray.push({ chatUser: 'Neo', chatTime: moment(new Date()).format('YYYY-MM-DD HH:mm'), chatMsg: this.enterMsg() });
        this.chatButtonEnable(0);
        //Pause 5 seconds to enter next message
        setTimeout(function () { chatVM.chatButtonEnable(1); }, 1000 * 5);
    }
};
var chatArray = ko.observableArray();

$(function () {
    ko.applyBindings(chatVM, document.getElementById("chatBox"));
    socket.on('recvChat', function (result) {
        chatArray.push({ chatUser: 'Neo', chatTime: moment(result.chatTime).format('YYYY-MM-DD HH:mm'), chatMsg: result.chatMsg });
       
    });
});