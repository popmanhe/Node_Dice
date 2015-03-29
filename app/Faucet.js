var request = require('request')
    , faucetHelper = require('./helper/faucetHelper.js')
    , config = require('../config');

module.exports = {
    VerifyResponse: function (userid, secret, response, callback) {
        
        request.post({
            url: 'https://www.google.com/recaptcha/api/siteverify', 
            form: {
                'secret': secret ,
                'response': response
            },
            method: 'POST'
           ,proxy: config.faucet.proxy
        }, function (err, httpResponse, body) {
            var re = JSON.parse(body);
            if (re.success) {
                faucetHelper.GetPay(userid, function (err, result) {
                    callback(err, result);
                });
            }
            else { 
                callback(null, { code: -1 }); //verify failed. no bitcoin;
            }
        });
  
    }
};