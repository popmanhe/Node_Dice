
import moment from 'moment';
const initState = {
    isRolling: false,
    autoBet: { numberOfRolls: 1, stopWin: 0, stopLoss: 0, increaseOnLose: 0, increaseOnWin: 0 },
    coins: [],
    allBets: []
};

export default (state = initState, action) => {
    switch (action.type) {
        case 'RECV_ALLBETS': //Get previous 100 bets when page loading
            return {
                ...state,
                allBets: action.bets
                    .map((bet) => { return { ...bet, betTime: moment(bet.betTime).format('MM-DD HH:mm:ss') }; })
            };
        // case 'GET_COINNAMES':
        //     socketEmit('coinNames', {});
        //     return state;
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
                    , autoBet: { ...state.autoBet, numberOfRolls }, currentBet: action.bet
                };
            }
        case 'END_ROLL':
            return { ...state, isRolling: false };
        default:
            return state;
    }

};