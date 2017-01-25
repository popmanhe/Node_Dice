'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bitcoin = require('bitcoin');

var _bitcoin2 = _interopRequireDefault(_bitcoin);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client = new _bitcoin2.default.Client(_config2.default.bitcoin);
exports.default = {
    GetNewAddress: function GetNewAddress(userid, callback) {
        client.getNewAddress(userid, callback);
    },
    GetBalance: function GetBalance(userid, callback) {
        //mini confirmation is 2, BTC only
        //Altcoin may need bigger confirmations.
        client.getReceivedByAccount(userid, 2, callback);
    },
    WithdrawFunds: function WithdrawFunds(userid, unit, callback) {}

};
//# sourceMappingURL=bitcoinHelper.js.map