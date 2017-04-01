import BTC from '../app/helper/bitcoinHelper';
import NXT from '../app/helper/nxtHelper';
export default {
    'BTC': BTC,
    'NXT': NXT,
    getCoinNames: function () {
        return [
            { coinName: 'BTC', min: 0.00000001, max: 1 }
            , { coinName: 'NXT', min: 1, max:1000 }
        ];
    }
};