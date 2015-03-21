var bitcoin = require('bitcoin'),
    config = config = require("../../config");

var client = new bitcoin.Client(config.bitcoin);
module.exports = {
    GetNewAddress: function (userid, callback){
        client.getNewAddress(userid, callback);
    },
    GetBalance: function (userid, callback) {
        //mini confirmation is 2, BTC only
        //Altcoin may need bigger confirmations.
        client.getReceivedByAccount(userid, 2, callback);
    },
    WithdrawFunds: function (userid, unit, callback) { 
    
    }

}