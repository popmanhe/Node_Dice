'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    'BTC': require('../app/helper/bitcoinHelper.js'),
    'NXT': '',
    'getCoinNames': function getCoinNames() {
        var names = [];
        for (var n in undefined) {
            if (typeof n === 'string') names.push({ 'name': n });
        }
        return names;
    }
};
//# sourceMappingURL=coinsConfig.js.map