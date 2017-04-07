/**
 * Copyright 2014 Node Dice.
 *
 * Created by Neo on 03/20/2017
 */

import faucet from './Faucet.js';
import logger from './helper/logger';
//import config from '../config';
//import path from 'path';
export default (app)=> {
    
  //  const seo_title = 'bit coin btc nxt altcoin dice game';
    app.use((req, res, next) => {
        logger.info((new Date()) + ' Request: ', req.originalUrl);
        next();
    });
      
    
    // default page
    app.get('/',  (req, res) => {
        res.send('hello node dice');
    });

    // app.get('/Roll_Over_Or_Under', (req, res) => {
         
    //     res.render('./games/Roll_Over_Or_Under',
    //         { page_title: 'Over or Under? ' + seo_title });
    // });
    
    // app.get('/Investment', (req, res) => {
    //     res.render('./games/Investment', { page_title: 'Investment ' + seo_title });
    // });

    // app.get('/Verification', (req, res) => {
    //     res.render('./http/Verification', {page_title: 'Verification ' + seo_title});
    // });
    
    // app.get('/Support', (req, res) => {
    //     res.render('./http/Support', { page_title: 'Support' + seo_title });
    // });
    
    // app.get('/faq', (req, res) => {
    //     res.render('./http/faq', { page_title: 'Faq ' + seo_title });
    // });
    
    //verify the response and return new balance if succeeded.
    app.post('/reCaptCha', (req, res) => {
        faucet.VerifyResponse(
            req.session.userid
            , req.body.g_recaptcha_response 
            ,  (err, result) => {
                if (err) { 
                    res.json(err);
                }
                else {
                    res.json(result);
                }
                res.end();
        });
    });
    //error handler
    // app.use(require('./views/http/index').http500);
    // app.use(require('./views/http/index').http404);
};
