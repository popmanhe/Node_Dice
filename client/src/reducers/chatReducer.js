import initialState from './initialState';
export default (state = initialState.chat, action) => {
    switch (action.type) {
         // case 'SEND_MESSAGE':
        //      return {...state, newMessage: '', messages: [...state.messages, {message: action.text, messageId: action.messageId, timeStamp: action.timeStamp} ]};
        case 'RECV_MESSAGE':{
            return {...state, messages: [...state.messages, {message: action.message.message, messageId: action.message.messageId, timeStamp: action.message.timeStamp} ]};    
        }
        default:
            return state;
    }
};