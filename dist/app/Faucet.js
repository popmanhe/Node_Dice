'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _faucetHelper = require('./helper/faucetHelper.js');

var _faucetHelper2 = _interopRequireDefault(_faucetHelper);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    VerifyResponse: function VerifyResponse(userid, response, callback) {

        _request2.default.post({
            url: 'https://www.google.com/recaptcha/api/siteverify',
            form: {
                'secret': '6LeD4QMTAAAAAEWzJqieM9nJIhlIDygbrx0IOyUk',
                'response': response
            },
            method: 'POST',
            proxy: _config2.default.faucet.proxy
        }, function (err, httpResponse, body) {
            var re = JSON.parse(body);
            if (re.success) {
                _faucetHelper2.default.GetPay(userid, function (err, result) {
                    callback(err, result);
                });
            } else {
                callback(null, { code: -1 }); //verify failed. no bitcoin;
            }
        });
    }
};
//# sourceMappingURL=Faucet.js.map