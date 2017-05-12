import moment from 'moment';
import update from 'immutability-helper';
const initState = {
    userName: null,
    userid: null,
    clientSalt: '',
    funds: null,
    nonce: 0,
    hashedServerSalt: '',
    isLoggedIn: false,
    myBets: []
};

export default (state = initState, action) => {
    switch (action.type) {
        case 'ROLLED':
            if (action.bet.userid == state.userid) {
                action.bet.betTime = moment(action.bet.betTime).format('MM-DD HH:mm:ss');
                let myBets = [action.bet, ...state.myBets];
                if (myBets.length > 100)
                    myBets.splice(99);
                const i = state.funds.findIndex((fund) => { return fund.coinName == action.bet.coinName; });
                const profit = state.funds[i].profit + action.bet.profit * 1;
                const fund = update(state.funds[i], { profit: { $set: profit } });
                const funds = update(state.funds, {
                    $splice: [[i, 1, fund]]
                });
                return { ...state, funds, myBets };
            }
            return state;
        case 'REFRESH_BALANCE':
            return { ...state, funds: action.funds };
        // case 'SET_BALANCE':
        //     {
        //         const funds = state.funds;

        //         let fund = funds.filter((fund) => { return fund.coinName == action.coinName; });
        //         fund.profit += action.value * 1;
        //         return { ...state, funds };
        //     }
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