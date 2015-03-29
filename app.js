/**
 * Copyright 2014 Node Dice
 *
 * Created by Neo on 2015/02/08
 */

'use strict';
require('newrelic');
var //cluster = require('cluster'),
    config = require('./config'),
    express = require('express'),
    app = express(),
    expressValidator = require('express-validator'),
    //favicon = require('serve-favicon'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require("express-session"),
    MongoStore = require('connect-mongo')(session),
    socketHandshake = require('socket.io-handshake');

/*set up view engine*/
var exphbs = require('express-handlebars')({
    helpers: {
        block: function (name) {
            var blocks = this._blocks,
                content = blocks && blocks[name];
            
            return content ? content.join('\n') : null;
        },
        contentFor: function (name, options) {
            var blocks = this._blocks || (this._blocks = {}),
                block = blocks[name] || (blocks[name] = []);
            
            block.push(options.fn(this));
        }
    },
    extname: '.hbs', 
    defaultLayout: '_Layout',
    layoutsDir  : config.serverRoot + '/views/layouts/',
    partialsDir : config.serverRoot + '/views/partials/'
});

//if (process.env.SITE_USER) {
//    app.use(express.basicAuth(process.env.SITE_USER, process.env.SITE_PASS));
//}

/*set up session for express*/
var sessionStore = new MongoStore(config.mongoStore);
app.use(cookieParser(config.cookieSecret));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.cookieSecret,
    store: sessionStore,
    cookie: {
      maxAge: config.session.timeout //session will expire in 30 days
    }
}));

/*require socket.io*/
var server = require('http').createServer(app);
var io = require('socket.io')(server);
/*Adding session to socket*/
io.use(socketHandshake({
    store: sessionStore, 
    key: 'connect.sid', 
    secret: config.cookieSecret, 
    parser: cookieParser()
}));

//config express in all environments
app.disable('x-powered-by');

app.engine('.hbs', exphbs);
app.set('view engine', '.hbs');
app.set('views', config.serverRoot + '/views');

//Add express's middlewares
//app.use(favicon(config.clientRoot + '/favicon.ico'));
//Only used in development. In production, use nginx to serve static files
if (process.env.NODE_ENV == 'development') {
    app.use(express.static(config.clientRoot));
    app.use(compression({ threshold: 512 }));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator([]));

//map routes for pages
require('./app/routes')(app, exphbs);
//socket communication for games
require('./app/sockets')(io);

server.listen(config.port, function () {
    console.log('Server running on port ' + config.port);
});


