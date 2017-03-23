import request from 'request';
import faucetHelper from './Models/faucetModel.js';
import config from '../config';

export default {
    VerifyResponse: function (userid, response, callback) {
        
        request.post({
            url: 'https://www.google.com/recaptcha/api/siteverify', 
            form: {
                'secret': '6LeD4QMTAAAAAEWzJqieM9nJIhlIDygbrx0IOyUk' ,
                'response': response
            },
            method: 'POST'
           ,proxy: config.faucet.proxy
        },  (err, httpResponse, body) => {
            let re = JSON.parse(body);
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