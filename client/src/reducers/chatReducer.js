import initialState from './initialState';
import { socketEmit } from '../utils/diceSocketHelper';
export default (state = initialState.chat, action) => {
    switch (action.type) {
        case 'SEND_MESSAGE':
            socketEmit('sendChat', { message: action.message });
            return state;
        case 'RECV_MESSAGE': {
            let receivedMessages = [...state.messages, action.message];
            if (receivedMessages.length > 100)
                receivedMessages.splice(0, receivedMessages.length - 100);
            return { ...state, messages: receivedMessages };
        }
        default:
            return state;
    }
};