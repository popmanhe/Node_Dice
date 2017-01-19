module.exports = {
    'BTC': require('../app/helper/bitcoinHelper.js'),
    'NXT':'',
    'getCoinNames': function () {
        var names = [];
        for (n in this) {
            if (typeof n === 'string')
                names.push({ 'name': n });
        }
        return names;
    }
}