import initialState from './initialState';
import { socketEmit } from '../utils/socketIoHelper';
export default (state = initialState.user, action) => {
    switch (action.type) {
        case 'SET_USER': {
            if (action.user)
                return {
                    ...state,
                    userName: action.user.userName,
                    userid: action.user.userid,
                    clientSalt: action.user.clientSalt,
                    funds: action.user.funds,
                    nonce: 0,
                    hashedServerSalt: action.user.hashedServerSalt,
                    isLoggedIn: action.isLoggedIn
                };
            else
                return {
                    ...state,
                    userName: null,
                    userid: null,
                    clientSalt: '',
                    funds: null,
                    nonce: 0,
                    hashedServerSalt: '',
                    isLoggedIn: false
                };
        }
        case 'SIGNUP_USER':
            socketEmit('newUser', { userName: action.userName, password: action.password });
            return state;
        case 'LOGIN_USER':
            socketEmit('loginUser', { userName: action.userName, password: action.password });
            return state;
        case 'REFRESH_BALANCE':
            socketEmit('getBalance', action.coinName);
            return state;
        case 'SAVE_CLIENTSALT':
            socketEmit('clientSalt', action.clientSalt);
            return state;
        default:
            return state;
    }
};