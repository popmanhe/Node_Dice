export default {
    'BTC': require('../app/helper/bitcoinHelper.js'),
    'NXT':'',
    'getCoinNames': function() {
        let names = [];
        for (let n in this) {
            if (typeof n === 'string')
                names.push({ 'name': n });
        }
        return names;
    }
};