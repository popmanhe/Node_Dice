var bitcoin = require('bitcoin'),
    config = config = require("../../config");

var client = new bitcoin.Client(config.bitcoin);
module.exports = {
    GetNewAddress: function (callback){
          client.getNewAddress(' ', callback);
    }

}