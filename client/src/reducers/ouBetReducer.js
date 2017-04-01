import initialState from './initialState';
export default (state = initialState.ou, action) => {
    switch (action.type) {
        case 'SET_COINNAMES':
            {
                
                let selectedCoin = state.selectedCoin;
                if (!selectedCoin)
                    selectedCoin = action.coins[0];
                    
                return { ...state, coins: action.coins, selectedCoin };
            }
        case 'CHANGE_COIN':
            return { ...state, selectedCoin: action.coin };
        default:
            return state;
    }

};