import initialState from './initialState';
export default (state = initialState.user, action) => {
    switch (action.type) {
        case 'LOGIN_USER':{
            return {...state, userName: action.userName};    
        }
        default:
            return state;
    }
};