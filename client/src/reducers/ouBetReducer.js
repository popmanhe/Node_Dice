import initialState from './initialState';
import { socketEmit } from '../utils/socketIoHelper';
export default (state = initialState.ou, action) => {
    switch (action.type) {
        case 'GET_COINNAMES':
            socketEmit('coinNames', {});
            return state;
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
            return { ...state, autoBet: action.autoBet };
        case 'ROLL':
            {
                socketEmit('roll', action.bet);
                let numberOfRolls = state.autoBet.numberOfRolls;
                if (numberOfRolls > 1)
                    numberOfRolls -= 1;
                    
                return {
                    ...state, isRolling: true, betAmout: action.bet.w, selectedNumber: action.bet.sn
                    , autoBet: { ...state.autoBet, numberOfRolls }
                };
            }
        case 'END_ROLL':
            return { ...state, isRolling: false };
        default:
            return state;
    }

};