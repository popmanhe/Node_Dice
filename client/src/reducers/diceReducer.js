
import moment from 'moment';
const initState = {
    isRolling: false,
    autoBet: { numberOfRolls: 1, stopWin: 0, stopLoss: 0, increaseOnLose: 0, increaseOnWin: 0 },
    coins: [],
    allBets: [],
    highRollers: []
};

export default (state = initState, action) => {
    switch (action.type) {
        case 'RECV_ALLBETS': //Get previous 100 bets when page loading
            {
                let allBets = [], highRollers = [];
                action.bets.forEach(function (bet) {
                    bet.betTime = moment(bet.betTime).format('MM-DD HH:mm:ss');
                    allBets.push(bet);
                    if (bet.betAmout > 0.001) {
                        highRollers.push(bet);
                    }
                });
                return { ...state, allBets, highRollers };
            }
        case 'SET_COINNAMES':
            {
                let selectedCoin = state.selectedCoin;
                if (!selectedCoin)
                    selectedCoin = action.coins[0];

                return { ...state, coins: action.coins, selectedCoin, betAmout: selectedCoin.min };
            }
        case 'SET_BETAMOUNT':
            return { ...state, betAmout: action.betAmout };
        case 'CHANGE_COIN':
            return { ...state, selectedCoin: action.coin };
        case 'SET_AUTOBETTING':
            {
                return { ...state, isRolling: action.stop ? state.isRolling : action.stop, autoBet: action.autoBet };
            }
        case 'ROLL':
            {

                let numberOfRolls = state.autoBet.numberOfRolls;
                if (numberOfRolls > 1)
                    numberOfRolls -= 1;

                return {
                    ...state, isRolling: true, betAmout: action.bet.w, selectedNumber: action.bet.sn
                    , autoBet: { ...state.autoBet, numberOfRolls }
                };
            }
        case 'ROLLED':
            {
                action.bet.betTime = moment(action.bet.betTime).format('MM-DD HH:mm:ss');
                let highRollers = action.bet.betAmout > 0.001 ? [action.bet, ...state.highRollers] : state.highRollers;
                if (highRollers.length > 100)
                    highRollers.splice(99);
                let allBets = [action.bet, ...state.allBets];
                if (allBets.length > 100)
                    allBets.splice(99);
                return { ...state, currentBet: action.bet, allBets, highRollers };
            }
        case 'END_ROLL':
            return { ...state, isRolling: false };
        default:
            return state;
    }

};