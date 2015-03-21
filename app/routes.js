/**
 * Copyright 2014 Node Dice.
 *
 * Created by Neo on 12/12/2014
 */

'use strict';

var config = require("../config");

module.exports = function(app, exphbs) {
    
    var seo_title = 'bit coin btc nxt altcoin dice game';
    app.use(function(req, res, next) {
        var logger = require('./helper/logger');
        logger.info((new Date()) + ' Request: ', req.originalUrl);
        next();
    });
    
    //default page
    app.get('/', function (req, res) {
        res.render('./games/Roll_Over_Or_Under', 
            {
            page_title: 'Over or Under? ' + seo_title
        });
    });

    app.get('/Roll_Over_Or_Under', function (req, res) {
        res.render('./games/Roll_Over_Or_Under', 
            {
            page_title: 'Over or Under? ' + seo_title
        });
    });

    app.get('/Verification', function(req, res) {
        res.render('./http/Verification', {page_title: 'Verification ' + seo_title});
    });
    
    app.get('/Support', function (req, res) {
        res.render('./http/Support', { page_title: 'Support' + seo_title });
    });
    
    app.get('/faq', function (req, res) {
        res.render('./http/faq', { page_title: 'Faq ' + seo_title });
    });
    //error handler
    app.use(require('./views/http/index').http500);
    app.use(require('./views/http/index').http404);
};
