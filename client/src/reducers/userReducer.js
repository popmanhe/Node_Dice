
const initState = {
    userName: null,
    userid: null,
    clientSalt: '',
    funds: null,
    nonce: 0,
    hashedServerSalt: '',
    isLoggedIn: false
};

export default (state = initState, action) => {
    switch (action.type) {
        case 'LOGGED_USER': {
            if (action.user)
                return {
                    ...state,
                    userName: action.user.userName,
                    userid: action.user.userid,
                    clientSalt: action.user.clientSalt,
                    funds: action.user.funds,
                    nonce: 0,
                    hashedServerSalt: action.user.hashedServerSalt,
                    isLoggedIn: true
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
        default:
            return state;
    }
};