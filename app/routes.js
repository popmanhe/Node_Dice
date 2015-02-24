/**
 * Copyright 2014 Node Dice.
 *
 * Created by Neo on 12/12/2014
 */

'use strict';

var config = require("../config");

module.exports = function(app, exphbs) {

    app.use(function(req, res, next) {
        var logger = require('./helper/logger');
        logger.info('Request: ', req.originalUrl);
        next();
    });

    app.get('/', function (req, res) {
        res.render('./games/Roll_Over_Or_Under', 
            {
            page_title: 'Over or Under?' 
        });
    });
    app.get('/Roll_Over_Or_Under', function (req, res) {
        res.render('./games/Roll_Over_Or_Under', 
            {
            page_title: 'Over or Under?' 
        });
    });
    //app.get('/Roll_Even_Or_Odd', function (req, res) {
    //    res.render('./games/Roll_Even_Or_Odd',
    //        {
    //            page_title: 'Even or Odd?'
    //        });
    //});

    app.get('/Verification', function(req, res) {
        res.render('./http/Verification', {page_title: 'Verification'});
    });
    
    app.get('/Support', function (req, res) {
        res.render('./http/Support', { page_title: 'Support' });
    });

    //    app.get('/project', function(req, res){  //Temporarily useless
    //        res.render('project');
    //    });
    //app.get('/app/posts/:language', require('./api/blog').getPosts);

    //app.post('/app/message', require('./api/support').sendMessage);

    //app.post('/app/projectplan', require('./api/projectplan').sendProject);

    //app.get('/app/personnel/:language', require('./api/personnel').readStaff);

    //app.get('/app/partners/:language', require('./api/partners').readPartner);

    //app.get('/app/projects/:language/:projects', require('./api/projects').readProjects);

    //app.get('/app/projectDetails/:id/:language', require('./api/projectDetails').findProDetails);

    //app.get('/app/contact/:language', require('./api/contacts').readcontacts);


    //the database manage page.
//    app.get('/' + config.dbManage, function(req, res) {
//        res.render('mongo_manage');
//    });
//
//    app.get('/app/dbCollections', require('./api/dbCollections').readCollections);
//    app.get('/app/dbQuery/:collectionName', require('./api/dbQuery').queryCollection);
//    app.post('/app/dbSave', require('./api/dbSave').saveCollection);


    //error handler
    app.use(require('./views/http/index').http500);
    app.use(require('./views/http/index').http404);
};
