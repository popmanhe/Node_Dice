import initialState from './initialState';
export default (state = initialState.user, action) => {
    switch (action.type) {
        case 'SET_USER': {
            if (action.user)
                return {
                    ...state,
                    userName: action.user.userName,
                    userid: action.user.guid,
                    clientSalt: action.user.clientSalt,
                    funds: action.user.funds,
                    nonce: 0,
                    hashedServerSalt: action.user.hashedServerSalt,
                    isLoggedIn: action.isLoggedIn
                };
            else
                return { ...state, isLoggedIn: action.isLoggedIn };
        }
        default:
            return state;
    }
};