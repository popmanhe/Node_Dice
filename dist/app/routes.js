/**
 * Copyright 2014 Node Dice.
 *
 * Created by Neo on 12/12/2014
 */

'use strict';

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _faucet = require('./faucet.js');

var _faucet2 = _interopRequireDefault(_faucet);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _logger = require('./helper/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app, exphbs) {

    var seo_title = 'bit coin btc nxt altcoin dice game';
    app.use(function (req, res, next) {
        _logger2.default.info(new Date() + ' Request: ', req.originalUrl);
        next();
    });

    //default page
    app.get('/', function (req, res) {
        res.render('./games/Roll_Over_Or_Under', {
            page_title: 'Over or Under? ' + seo_title
        });
    });

    app.get('/Roll_Over_Or_Under', function (req, res) {

        res.render('./games/Roll_Over_Or_Under', { page_title: 'Over or Under? ' + seo_title });
    });

    app.get('/Investment', function (req, res) {
        res.render('./games/Investment', { page_title: 'Investment ' + seo_title });
    });

    app.get('/Verification', function (req, res) {
        res.render('./http/Verification', { page_title: 'Verification ' + seo_title });
    });

    app.get('/Support', function (req, res) {
        res.render('./http/Support', { page_title: 'Support' + seo_title });
    });

    app.get('/faq', function (req, res) {
        res.render('./http/faq', { page_title: 'Faq ' + seo_title });
    });

    //verify the response and return new balance if succeeded.
    app.post('/reCaptCha', function (req, res) {
        _faucet2.default.VerifyResponse(req.session.userid, req.body.g_recaptcha_response, function (err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
            res.end();
        });
    });
    //error handler
    app.use(require('./views/http/index').http500);
    app.use(require('./views/http/index').http404);
};
//# sourceMappingURL=routes.js.map