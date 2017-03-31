import BTC from '../app/helper/bitcoinHelper';
import NXT from '../app/helper/nxtHelper';
export default {
    'BTC': BTC,
    'NXT': NXT,
    getCoinNames: function() {
        return ['BTC','NXT'];
    }
};