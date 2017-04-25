import moment from 'moment';
const initState = {
    messages: []
};

export default (state = initState, action) => {
    switch (action.type) {
        case 'RECV_MESSAGES': { //load chat messages when page loading
            const messages = action.messages;
            let newMessages = [];
            if (messages && messages.length > 0) {
                messages.sort((a, b) => a.timeStamp > b.timeStamp ? 1 : -1);
                newMessages = messages.map((msg) => {
                    return {
                        userName: msg.userName
                        , timeStamp: moment(msg.timeStamp).format('MM-DD HH:mm')
                        , message: msg.message
                    };
                });
            }
            return { ...state, messages: newMessages };
        }
        case 'RECV_MESSAGE': { //receive single chat message from other users

            action.message.timeStamp = moment(action.message.timeStamp).format('MM-DD HH:mm');
            let receivedMessages = [...state.messages, action.message];
            if (receivedMessages.length > 100)
                receivedMessages.splice(0, receivedMessages.length - 100);
            return { ...state, messages: receivedMessages };
        }
        default:
            return state;
    }
};