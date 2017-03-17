import initialState from './initialState';
export default (state = initialState.chat, action) => {
    switch (action.type) {
        case 'TYPE_MESSAGE':
            return {...state, newMessage: action.text};
        case 'SEND_MESSAGE':
             return {...state, newMessage: '', messages: [...state.messages, {message: action.text, messageId: action.messageId, timeStamp: action.messageTimeStamp} ]};
        default:
            return state;
    }
};