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
        case 'ROLL':
            socketEmit('roll', action.bet);
            return { ...state, isRolling: true, betAmout: action.bet.w, selectedNumber: action.bet.sn };
        case 'END_ROLL':
            return { ...state, isRolling: false };
        default:
            return state;
    }

};