import initialState from './initialState';
export default (state = initialState.user, action) => {
    switch (action.type) {
        case 'SET_USER':{
            return {...state, userName: action.userName, isLoggedIN: action.isLoggedIn};    
        }
        default:
            return state;
    }
};