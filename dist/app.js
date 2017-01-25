/**
 * Copyright 2014 Node Dice
 *
 * Created by Neo on 2015/02/08
 */

'use strict';

var _newrelic = require('newrelic');

var _newrelic2 = _interopRequireDefault(_newrelic);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _connectMongo = require('connect-mongo');

var _connectMongo2 = _interopRequireDefault(_connectMongo);

var _socket = require('socket.io-handshake');

var _socket2 = _interopRequireDefault(_socket);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _socket3 = require('socket.io');

var _socket4 = _interopRequireDefault(_socket3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import cluster from 'cluster');
var app = (0, _express2.default)();
//favicon from 'serve-favicon'),

var MongoStore = (0, _connectMongo2.default)(_expressSession2.default);
/*set up view engine*/
var exphbs = (0, _expressHandlebars2.default)({
    helpers: {
        block: function block(name) {
            var blocks = this._blocks,
                content = blocks && blocks[name];

            return content ? content.join('\n') : null;
        },
        contentFor: function contentFor(name, options) {
            var blocks = this._blocks || (this._blocks = {}),
                block = blocks[name] || (blocks[name] = []);

            block.push(options.fn(this));
        }
    },
    extname: '.hbs',
    defaultLayout: '_Layout',
    layoutsDir: _config2.default.serverRoot + '/views/layouts/',
    partialsDir: _config2.default.serverRoot + '/views/partials/'
});

//if (process.env.SITE_USER) {
//    app.use(express.basicAuth(process.env.SITE_USER, process.env.SITE_PASS));
//}

/*set up session for express*/
var sessionStore = new MongoStore(_config2.default.mongoStore);
app.use((0, _cookieParser2.default)(_config2.default.cookieSecret));
app.use((0, _expressSession2.default)({
    resave: true,
    saveUninitialized: true,
    secret: _config2.default.cookieSecret,
    store: sessionStore,
    cookie: {
        maxAge: _config2.default.session.timeout //session will expire in 30 days
    }
}));

/*require socket.io*/
var server = _http2.default.createServer(app);
var io = (0, _socket4.default)(server);
/*Adding session to socket*/
io.use((0, _socket2.default)({
    store: sessionStore,
    key: 'connect.sid',
    secret: _config2.default.cookieSecret,
    parser: (0, _cookieParser2.default)()
}));

//config express in all environments
app.disable('x-powered-by');

app.engine('.hbs', exphbs);
app.set('view engine', '.hbs');
app.set('views', _config2.default.serverRoot + '/views');

//Add express's middlewares
//app.use(favicon(config.clientRoot + '/favicon.ico'));
//Only used in development. In production, use nginx to serve static files
if (process.env.NODE_ENV == 'development') {
    app.use(_express2.default.static(_config2.default.clientRoot));
    app.use((0, _compression2.default)({ threshold: 512 }));
}
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _expressValidator2.default)([]));

//map routes for pages
require('./app/routes')(app, exphbs);
//socket communication for games
require('./app/sockets')(io);

server.listen(_config2.default.port, function () {
    console.log('Server running on port ' + _config2.default.port);
});
//# sourceMappingURL=app.js.map