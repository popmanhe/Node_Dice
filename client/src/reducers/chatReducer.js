import initialState from './initialState';
export default (state = initialState.chat, action) => {
    switch (action.type) {
         // case 'SEND_MESSAGE':
        //      return {...state, newMessage: '', messages: [...state.messages, {message: action.text, messageId: action.messageId, timeStamp: action.timeStamp} ]};
        case 'RECV_MESSAGE':{
        
            let receivedMessages = [...state.messages, action.message ];
            if (receivedMessages.length > 100)
                receivedMessages.splice(0, receivedMessages.length - 100);
            return {...state, messages: receivedMessages};    
        }
        default:
            return state;
    }
};