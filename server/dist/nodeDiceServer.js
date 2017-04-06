/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _all = __webpack_require__(27);

var _all2 = _interopRequireDefault(_all);

var _development = __webpack_require__(28);

var _development2 = _interopRequireDefault(_development);

var _production = __webpack_require__(29);

var _production2 = _interopRequireDefault(_production);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// default is development environment
console.log('process.env.NODE_ENV' + "production");
// process.env.NODE_ENV = JSON.stringify(process.env.NODE_ENV || 'development');
var config =  true ? Object.assign(_all2.default, _production2.default) : Object.assign(_all2.default, _development2.default);

// Load app configuration
exports.default = config;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _mongoose = __webpack_require__(33);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//   ttl = require('mongoose-ttl');
/**
 * Copyright 2014 Node Dice
 *
 * Created by Neo on 2014/11/27.
 */

_mongoose2.default.connect(_config2.default.mongodb.hostaddress + '/' + _config2.default.mongodb.dbname); //connect to the mongodb driver.

//request the config files.
var db = _mongoose2.default.connection;
db.on('error', console.error.bind(console, 'connection error:'));

exports.default = {
  db: db,
  mongoose: _mongoose2.default
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dbConnect = __webpack_require__(1);

var _dbConnect2 = _interopRequireDefault(_dbConnect);

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _uuid = __webpack_require__(7);

var _uuid2 = _interopRequireDefault(_uuid);

var _coinsConfig = __webpack_require__(5);

var _coinsConfig2 = _interopRequireDefault(_coinsConfig);

var _crypto = __webpack_require__(3);

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import logger from '../helper/logger';
var mongoose = _dbConnect2.default.mongoose; /**
                                              * Copyright 2017 Node Dice
                                              *
                                              * Created by Neo on 2017/01/19.
                                              */

mongoose.Promise = global.Promise;
/*view models*/
/*user schema*/
var userSchema = new mongoose.Schema({
    userName: { type: String, index: { unique: true } },
    password: { type: String },
    clientSalt: String,
    serverSalt: String,
    nonce: Number,
    createTime: { type: Date },
    funds: [{
        coinName: String,
        depositAmount: Number,
        depositAddress: String,
        withdrawAddress: String,
        withdrawAmount: Number,
        profit: Number
    }]
}, { autoIndex: _config2.default.mongodb.autoIndex });
//Instance methods
userSchema.methods.getFund = function (coinName) {
    for (var i in this.funds) {
        var fund = this.funds[i];
        if (fund.coinName == coinName) return fund;
    }
    return null;
};

userSchema.methods.getBalance = function (coinName) {

    var fund = this.getFund(coinName);
    if (fund) return fund.depositAmount - fund.withdrawAmount + fund.profit;

    return 0;
};

userSchema.methods.addProfit = function (coinName, profit) {

    var fund = this.getFund(coinName);
    if (fund) {
        fund.profit += profit;
        return fund;
    }
};

userSchema.methods.setDeposit = function (coinName, amount) {

    var fund = this.getFund(coinName);
    if (fund && amount) {
        fund.depositAmount = amount;
    }

    return fund;
};

userSchema.methods.setDepositAddr = function (coinName, addr) {

    var fund = this.getFund(coinName);
    if (fund) {
        fund.depositAddress = addr;
        return fund;
    }
};

//Static methods
userSchema.statics = {
    CreateNewUser: function CreateNewUser(userName, password, callback) {
        password = _crypto2.default.createHash('sha512').update(password).digest('hex');
        var user = new userModel({
            userName: userName,
            password: password,
            serverSalt: _uuid2.default.v4(),
            clientSalt: _uuid2.default.v4(),
            nonce: 0,
            createTime: new Date(),
            funds: [{
                coinName: 'BTC',
                depositAddress: '', depositAmount: 0,
                withdrawAddress: '', withdrawAmount: 0,
                profit: 0
            }, {
                coinName: 'NXT',
                depositAddress: '', depositAmount: 0,
                withdrawAddress: '', withdrawAmount: 0,
                profit: 0
            }]
        });

        user.save(function (err) {
            if (err) {
                callback(err, null);
                // console.error('Saving user error: ' + err);
            } else {
                callback(null, user);
            }
        });
    },
    GetUserById: function GetUserById(userid, fields, callback) {
        userModel.findOne({ _id: userid }, fields, callback);
    },
    SaveClientSalt: function SaveClientSalt(userid, clientSalt, callback) {
        userModel.findOne({ _id: userid }, "clientSalt serverSalt", function (err, u) {
            if (err) callback({ error: err }, null);else {

                var _clientSalt = void 0,
                    _serverSalt = void 0;
                _clientSalt = u.clientSalt;
                _serverSalt = u.serverSalt;

                u.clientSalt = clientSalt;
                u.serverSalt = _uuid2.default.v4();
                u.nonce = 0;
                u.save();
                callback(null, { clientSalt: _clientSalt, serverSalt: _serverSalt });
            }
        });
    },
    GetNewAddress: function GetNewAddress(userid, coinName, callback) {
        var helper = _coinsConfig2.default[coinName];
        helper.GetNewAddress(userid, function (err, addr) {
            if (err) {
                callback(err, null);
            } else {
                userModel.findOne({ _id: userid }, "funds", function (err, u) {
                    if (err) {
                        callback(err, null);
                    } else {
                        u.setDepositAddr('BTC', addr);
                        u.save();
                        callback(err, { address: addr });
                    }
                });
            }
        });
    },
    GetBalance: function GetBalance(userid, coinName, callback) {
        var helper = _coinsConfig2.default[coinName];

        helper.GetBalance(userid, function (err, amount) {
            userModel.findOne({ _id: userid }, "funds", function (err, u) {
                if (err) {
                    callback(err, null);
                } else {
                    u.setDeposit(coinName, amount);
                    u.save();

                    callback(err, u.getBalance(coinName));
                }
            });
        });
    },
    LoginUser: function LoginUser(userName, password, callback) {
        password = _crypto2.default.createHash('sha512').update(password).digest('hex');
        userModel.findOne({ userName: userName, password: password }, "_id userName serverSalt clientSalt nonce funds", function (err, u) {
            if (err) {
                callback(err, null);
            } else {
                if (u) {
                    callback(null, u);
                } else callback('user not found', null);
            }
        });
    }
};

var userModel = mongoose.model('User', userSchema);

/*exports models*/
exports.default = userModel;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = __webpack_require__(6);

var _path2 = _interopRequireDefault(_path);

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _winston = __webpack_require__(35);

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_winston2.default.transports.DailyRotateFile = __webpack_require__(36); /**
                                                                                      * Copyright 2014 eRealm Info & Tech.
                                                                                      *
                                                                                      * Created by Ken on 8/08/2014
                                                                                      */
exports.default = new _winston2.default.Logger({
    transports: [new _winston2.default.transports.Console({
        level: 'debug',
        colorize: true
    }), new _winston2.default.transports.DailyRotateFile({
        level: 'silly',
        filename: _path2.default.join(_config2.default.serverRoot, '/logs/access-'),
        datePattern: 'yyyy-MM-dd.log',
        maxsize: 5242880 /* 5MB */
    })]
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bitcoinHelper = __webpack_require__(21);

var _bitcoinHelper2 = _interopRequireDefault(_bitcoinHelper);

var _nxtHelper = __webpack_require__(23);

var _nxtHelper2 = _interopRequireDefault(_nxtHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    'BTC': _bitcoinHelper2.default,
    'NXT': _nxtHelper2.default,
    getCoinNames: function getCoinNames() {
        return [{ coinName: 'BTC', min: 0.00000001, max: 1 }, { coinName: 'NXT', min: 1, max: 1000 }];
    }
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Faucet = __webpack_require__(17);

var _Faucet2 = _interopRequireDefault(_Faucet);

var _logger = __webpack_require__(4);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import config from '../config';
//import path from 'path';
/**
 * Copyright 2014 Node Dice.
 *
 * Created by Neo on 03/20/2017
 */

exports.default = function (app) {

    //  const seo_title = 'bit coin btc nxt altcoin dice game';
    app.use(function (req, res, next) {
        _logger2.default.info(new Date() + ' Request: ', req.originalUrl);
        next();
    });

    //default page
    // app.get('/',  (req, res) => {
    //     res.sendFile(config.clientRoot + 'index.html');
    // });

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
    app.post('/reCaptCha', function (req, res) {
        _Faucet2.default.VerifyResponse(req.session.userid, req.body.g_recaptcha_response, function (err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
            res.end();
        });
    });
    //error handler
    // app.use(require('./views/http/index').http500);
    // app.use(require('./views/http/index').http404);
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _s_common = __webpack_require__(25);

var _s_common2 = _interopRequireDefault(_s_common);

var _s_overunder = __webpack_require__(26);

var _s_overunder2 = _interopRequireDefault(_s_overunder);

var _s_chat = __webpack_require__(24);

var _s_chat2 = _interopRequireDefault(_s_chat);

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _logger = __webpack_require__(4);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import uuid from 'uuid';
// import socketSession from './handshake.js';

// const assignSessionID = (socket, next) =>{
//          logger.info('foo='+socket.handshake.query.foo);
//         return next();
// };

exports.default = function (io) {
    _logger2.default.info("Web socket is enabled for following domain(s): " + _config2.default.origins);
    io.origins(_config2.default.origins);
    // io.use(socketSession());

    (0, _s_common2.default)(io);
    (0, _s_overunder2.default)(io);
    (0, _s_chat2.default)(io);
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("express-validator");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _express = __webpack_require__(12);

var _express2 = _interopRequireDefault(_express);

var _expressValidator = __webpack_require__(13);

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _compression = __webpack_require__(11);

var _compression2 = _interopRequireDefault(_compression);

var _bodyParser = __webpack_require__(10);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _http = __webpack_require__(14);

var _http2 = _interopRequireDefault(_http);

var _socket = __webpack_require__(15);

var _socket2 = _interopRequireDefault(_socket);

var _routes = __webpack_require__(8);

var _routes2 = _interopRequireDefault(_routes);

var _sockets = __webpack_require__(9);

var _sockets2 = _interopRequireDefault(_sockets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import cookieParser from 'cookie-parser';
// import session from 'express-session';
// import MongoConnect from 'connect-mongo';
// import socketHandshake from 'socket.io-handshake';

//favicon from 'serve-favicon'),
var app = (0, _express2.default)();
// const MongoStore = MongoConnect(session);
//if (process.env.SITE_USER) {
//    app.use(express.basicAuth(process.env.SITE_USER, process.env.SITE_PASS));
//}

/*set up session for express*/
// const sessionStore = new MongoStore(config.mongoStore);
// app.use(cookieParser(config.cookieSecret));
// app.use(session({
//     resave: true,
//     saveUninitialized: true,
//     secret: config.cookieSecret,
//     store: sessionStore,
//     cookie: {
//       maxAge: config.session.timeout //session will expire in 30 days
//     }
// }));

/*require socket.io*/
/**
 * Copyright 2017 Node Dice
 *
 * Created by Neo on 2017/02/08
 */

//import newrelic from 'newrelic';
//import cluster from 'cluster');
var server = _http2.default.createServer(app);
var io = (0, _socket2.default)(server, { cookie: 'dSession', cookiePath: '/', cookieHttpOnly: true });

/*Adding session to socket*/
// io.use(socketHandshake({
//     store: sessionStore, 
//     key: 'connect.id', 
//     secret: config.cookieSecret, 
//     parser: cookieParser()
// }));

//config express in all environments
app.disable('x-powered-by');

//Add express's middlewares
//app.use(favicon(config.clientRoot + '/favicon.ico'));
//Only used in development. In production, use nginx to serve static files
if (false) {
  app.use(_express2.default.static(_config2.default.clientRoot));
  app.use((0, _compression2.default)({ threshold: 512 }));
}
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _expressValidator2.default)([]));

//map routes for pages
(0, _routes2.default)(app);
//socket communication for games
(0, _sockets2.default)(io);

server.listen(_config2.default.port, function () {
  console.log('Server running on port ' + _config2.default.port);
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _request = __webpack_require__(34);

var _request2 = _interopRequireDefault(_request);

var _faucetModel = __webpack_require__(20);

var _faucetModel2 = _interopRequireDefault(_faucetModel);

var _config = __webpack_require__(0);

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
                _faucetModel2.default.GetPay(userid, function (err, result) {
                    callback(err, result);
                });
            } else {
                callback(null, { code: -1 }); //verify failed. no bitcoin;
            }
        });
    }
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dbConnect = __webpack_require__(1);

var _dbConnect2 = _interopRequireDefault(_dbConnect);

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright 2017 Node Dice
 *
 * Created by Neo on 2017/02/24.
 */

var mongoose = _dbConnect2.default.mongoose;
//const db = dbConnect.db;
/*bet schema*/
var betSchema = new mongoose.Schema({
    userid: String,
    userName: String,
    clientSalt: String,
    serverSalt: String,
    nonce: Number,
    amount: Number,
    selNum: Number,
    unit: String,
    betTime: { type: Date, expires: 60 * 60 * 24 * 30, index: true },
    rollNum: Number
}, { autoIndex: _config2.default.mongodb.autoIndex });
//Static methods
betSchema.statics = {
    GetBetsByUser: function GetBetsByUser(userid, callback) {
        var query = betModel.find({ userid: userid }, 'rollNum nonce betTime selNum amount unit', { limit: 100 });
        query.sort({ betTime: -1 }).exec(callback);
    },
    GetAllBets: function GetAllBets(callback) {
        var query = betModel.find({}, 'rollNum nonce betTime selNum amount unit', { limit: 100 });
        query.sort({ betTime: -1 }).exec(callback);
    }
};

var betModel = mongoose.model('Bet', betSchema);

exports.default = betModel;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dbConnect = __webpack_require__(1);

var _dbConnect2 = _interopRequireDefault(_dbConnect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = _dbConnect2.default.mongoose;
mongoose.Promise = global.Promise;
/*chat schema*/
var chatSchema = new mongoose.Schema({
    userName: String,
    timeStamp: { type: Date, expires: 60 * 60 * 24 * 7 }, //msg expired in a week
    message: String
});

var chatModel = mongoose.model('Chat', chatSchema);

exports.default = {
    Chat: chatModel,
    GetChats: function GetChats(callback) {
        chatModel.find({}, 'userName timeStamp message').sort({ timeStamp: -1 }).limit(100).exec(callback);
    },
    AddChat: function AddChat(chat, callback) {
        var c = new chatModel({
            userName: chat.userName,
            timeStamp: chat.timeStamp,
            message: chat.message
        });

        c.save(callback);
    }
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dbConnect = __webpack_require__(1);

var _dbConnect2 = _interopRequireDefault(_dbConnect);

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

var _userModel = __webpack_require__(2);

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = _dbConnect2.default.mongoose;

var faucetSchema = new mongoose.Schema({
    lastTime: Date,
    userid: String
});
/*Static methods*/
faucetSchema.statics = {
    GetPay: function GetPay(userid, callback) {
        _userModel2.default.GetUserById(userid, 'funds', function (err, u) {
            if (err) {
                callback(err, null);
            } else {
                faucetModel.findOne({ userid: userid }, 'lastTime', function (err, fa) {
                    var now = new Date();
                    if (!fa) {
                        fa = new faucetModel({
                            userid: userid,
                            lastTime: now
                        });
                    }

                    if (now == fa.lastTime || now - fa.lastTime >= _config2.default.faucet.interval) {
                        //send out bitcoin every 15 minutes

                        fa.lastTime = now;
                        fa.save();

                        var amount = randomIntInc(_config2.default.faucet.min, _config2.default.faucet.max);
                        u.addProfit('BTC', amount * 0.00000001);
                        u.save();

                        callback(null, { code: 0, faucet: amount, balance: u.getBalance('BTC') });
                    } else {
                        callback(null, { code: -2, lastTime: fa.lastTime }); //too soon
                    }
                });
            }
        });
    }
};
/*functions*/
var randomIntInc = function randomIntInc(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
};
var faucetModel = mongoose.model('Faucet', faucetSchema);

exports.default = faucetModel;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bitcoin = __webpack_require__(31);

var _bitcoin2 = _interopRequireDefault(_bitcoin);

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client = new _bitcoin2.default.Client(_config2.default.bitcoin);
exports.default = {
    GetNewAddress: function GetNewAddress(userid, callback) {
        client.getNewAddress(userid, callback);
    },
    GetBalance: function GetBalance(userid, callback) {
        //mini confirmation is 2, BTC only
        //Altcoin may need bigger confirmations.

        if (false)
            //In development, return 10 BTC for testing.
            callback(null, 10);else client.getReceivedByAccount(userid, 2, callback);
    },
    WithdrawFunds: function WithdrawFunds(userid, unit) {
        //dummy code for lint rules
        userid = '';
        unit = 'BTC';

        return unit;
    }

};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _crypto = __webpack_require__(3);

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (key, text) {

    //create HMAC using server seed as key and client seed as message
    var hash = _crypto2.default.createHmac('sha512', key).update(text).digest('hex');

    var index = 0;

    var lucky = parseInt(hash.substring(index * 5, index * 5 + 5), 16);

    //keep grabbing characters from the hash while greater than 
    while (lucky >= Math.pow(10, 6)) {
        index++;
        lucky = parseInt(hash.substring(index * 5, index * 5 + 5), 16);

        //if we reach the end of the hash, just default to highest number
        if (index * 5 + 5 > 128) {
            lucky = 99.99;
            break;
        }
    }

    lucky %= Math.pow(10, 4);
    lucky /= Math.pow(10, 2);

    return lucky;
}; //the seed pair itself
//var clientSeed = "your client seed"; //dont forget to exclude the dash and the nonce!
//var serverSeed = "your server seed";

//bet made with seed pair (excluding current bet)
//var nonce = 0;

//crypto lib for hmac function

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _uuid = __webpack_require__(7);

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    GetNewAddress: function GetNewAddress(userid, callback) {
        callback(null, _uuid2.default.v4());
    },
    GetBalance: function GetBalance(userid, callback) {
        //mini confirmation is 2, BTC only
        //Altcoin may need bigger confirmations.

        if (false)
            //In development, return 10 BTC for testing.
            callback(null, 1000000);else callback(null, 0);
    },
    WithdrawFunds: function WithdrawFunds(userid, unit) {
        //dummy code for lint rules
        userid = '';
        unit = 'NXT';

        return unit;
    }

};
// import config from '../../config';

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _chatModel = __webpack_require__(19);

var _chatModel2 = _interopRequireDefault(_chatModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import logger from '../helper/logger';

var chat = function chat(io) {

    io.on('connection', function (socket) {
        socket.on('getChats', function () {
            _chatModel2.default.GetChats(function (err, chats) {
                if (err) return console.error('getChats error:' + err);
                socket.emit('getChats', chats);
            });
        });

        socket.on('sendChat', function (chat) {
            if (socket.user) {
                chat.userName = socket.user.userName;
                chat.timeStamp = new Date();
                _chatModel2.default.AddChat(chat, function (err) {
                    if (err) return console.error('sendChat error:' + err);
                });
                io.emit('recvChat', {
                    userName: chat.userName,
                    timeStamp: chat.timeStamp,
                    message: chat.message
                });
            }
        });
    });
};

exports.default = chat;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _userModel = __webpack_require__(2);

var _userModel2 = _interopRequireDefault(_userModel);

var _crypto = __webpack_require__(3);

var _crypto2 = _interopRequireDefault(_crypto);

var _coinsConfig = __webpack_require__(5);

var _coinsConfig2 = _interopRequireDefault(_coinsConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (io) {

    //socket.io events
    io.on('connection', function (socket) {
        // const session = socket.handshake.session;
        socket.on('coinNames', function () {
            return socket.emit('coinNames', _coinsConfig2.default.getCoinNames());
        });

        //return a new user
        socket.on('newUser', function (u) {
            _userModel2.default.CreateNewUser(u.userName, u.password, function (err, user) {
                if (err) {
                    if (err.code == 11000) socket.emit('newUser', { error: { code: 11000 } });
                } else {
                    var newUser = {
                        userid: user._id,
                        userName: user.userName,
                        clientSalt: user.clientSalt,
                        funds: user.funds,
                        nonce: 0,
                        hashedServerSalt: _crypto2.default.createHash('sha512').update(user.serverSalt).digest('hex')
                    };
                    socket.user = { userid: newUser.userid, userName: newUser.userName };
                    socket.emit('newUser', newUser);
                }
            });
        });

        //return an existing user
        socket.on('existingUser', function () {
            _userModel2.default.GetUserById(socket.user.userid, "clientSalt serverSalt _id userName funds nonce", function (err, u) {
                if (err) {
                    socket.emit('existingUser', { clientSalt: '', error: err });
                } else {
                    if (u) {
                        socket.emit('existingUser', {
                            userid: u._id,
                            userName: u.userName,
                            clientSalt: u.clientSalt,
                            funds: u.funds,
                            nonce: u.nonce,
                            hashedServerSalt: _crypto2.default.createHash('sha512').update(u.serverSalt).digest('hex')
                        });
                    } else {
                        socket.emit('existingUser', { clientSalt: '', error: 'session expired' });
                    }
                }
            });
        });

        //update client salt
        socket.on('clientSalt', function (clientSalt) {
            _userModel2.default.SaveClientSalt(socket.user.userid, clientSalt, function (err, oldSalt) {
                if (err) socket.emit('clientSalt', err);else socket.emit('clientSalt', oldSalt);
            });
        });

        //get new bitcion address
        socket.on('newCoinAddr', function (coinName) {
            _userModel2.default.GetNewAddress(socket.user.userid, coinName, function (err, addr) {
                if (err) socket.emit('newCoinAddr', err);else socket.emit('newCoinAddr', addr);
            });
        });

        //get user balance
        socket.on('getBalance', function (coinName) {
            _userModel2.default.GetBalance(socket.user.userid, coinName, function (err, balance) {
                if (err) socket.emit('getBalance', err);else socket.emit('getBalance', balance);
            });
        });

        //get user balance
        socket.on('loginUser', function (user) {
            _userModel2.default.LoginUser(user.userName, user.password, function (err, user) {
                if (err) socket.emit('loggedUser', { error: err });else {
                    var loggedUser = {
                        userid: user._id,
                        userName: user.userName,
                        clientSalt: user.clientSalt,
                        funds: user.funds,
                        nonce: user.nonce,
                        hashedServerSalt: _crypto2.default.createHash('sha512').update(user.serverSalt).digest('hex')
                    };
                    socket.user = { userid: loggedUser.userid, userName: loggedUser.userName };
                    socket.emit('loggedUser', loggedUser);
                }
            });
        });
    });
}; /**
    * Copyright 2017 Node Dice
    *
    * Created by Neo on 2017/01/17.
    */

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _userModel = __webpack_require__(2);

var _userModel2 = _interopRequireDefault(_userModel);

var _betModel = __webpack_require__(18);

var _betModel2 = _interopRequireDefault(_betModel);

var _cryptoroll = __webpack_require__(22);

var _cryptoroll2 = _interopRequireDefault(_cryptoroll);

var _lodash = __webpack_require__(32);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright 2017 Node Dice
 *
 * Created by Neo on 2017/03/27.
 */

//import config from '../../config';
var overunder = function overunder(io) {

    io.on('connection', function (socket) {
        var gameName = 'overunder';
        socket.join(gameName);

        //return a 
        socket.on('roll', function (clientBet) {

            _userModel2.default.GetUserById(socket.user.userid, "clientSalt serverSalt nonce funds", function (err, u) {
                if (err) socket.emit('rollError', { code: -6 });else {

                    //validate input
                    if (!_lodash2.default.isNumber(clientBet.w - 0)) {
                        socket.emit('rollError', { code: -3 });
                        return;
                    }

                    if (clientBet.w <= 0) {
                        socket.emit('rollError', { code: -2 });
                        return;
                    }
                    if (u.getBalance(clientBet.coinName) < clientBet.w) {
                        // not enough fund
                        socket.emit('rollError', { code: -1 });
                        return;
                    }

                    //increase nonce
                    u.nonce++;

                    //get lucky number
                    var num = (0, _cryptoroll2.default)(u.serverSalt, u.clientSalt + '-' + u.nonce);
                    var bet = new _betModel2.default({
                        userid: socket.user.userid,
                        userName: socket.user.userName,
                        clientSalt: u.clientSalt,
                        serverSalt: u.serverSalt,
                        nonce: u.nonce,
                        amount: clientBet.w,
                        selNum: clientBet.sn,
                        unit: clientBet.coinName,
                        betTime: new Date(),
                        rollNum: num
                    });
                    bet.save(function (err) {
                        if (err) {
                            console.error('Saving bet error:' + err);
                            socket.emit('rollError', { code: -4 });
                            return;
                        }
                    });
                    //Todo: process bet's result here
                    var payout = bet.selNum <= 49.5 ? 99 / bet.selNum : 99 / (99.99 - bet.selNum);
                    var profit = GetProfit(bet.rollNum, bet.selNum, bet.amount, payout);
                    u.addProfit(clientBet.coinName, profit);
                    u.save(function (err) {
                        if (err) {
                            console.error('Saving user\'s profit error:' + err);
                            socket.emit('rollError', { code: -5 });
                            return;
                        }
                    });
                    //Every bet is sent to everyone who is in over/under game. 
                    var result = {
                        userid: socket.user.userid,
                        userName: socket.user.userName,
                        rollNum: num,
                        nonce: u.nonce,
                        betTime: bet.betTime,
                        selNum: bet.selNum,
                        amount: bet.amount,
                        unit: bet.unit,
                        profit: profit,
                        payout: payout
                    };

                    io.to(gameName).emit('allBets', result);
                }
            });
        });

        socket.on('getMyBets', function () {
            _betModel2.default.GetBetsByUser(socket.user.userid, function (err, bets) {
                if (err) return console.error('GetBetsByUser error:' + err);
                socket.emit('getMyBets', bets);
            });
        });

        socket.on('getAllBets', function () {
            _betModel2.default.GetAllBets(function (err, bets) {
                if (err) return console.error('getAllBets error:' + err);
                socket.emit('getAllBets', bets);
            });
        });

        //functions
        var GetProfit = function GetProfit(rollNum, selNum, amount, payout) {

            if (selNum * 1 <= 49.5 && rollNum * 1 <= selNum * 1 || selNum * 1 >= 50.49 && rollNum * 1 >= selNum * 1) {
                return amount * (payout - 1);
            } else {
                return -1 * amount;
            }
        };
    });
};

exports.default = overunder;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = __webpack_require__(6);

var _path2 = _interopRequireDefault(_path);

var _package = __webpack_require__(30);

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootPath = _path2.default.resolve('.');
var config = {
    root: rootPath,
    serverRoot: rootPath + '/dist/',
    clientRoot: rootPath + '/dist/html/',
    cookieSecret: 'node_DICE',
    port: process.env.PORT || 3000,
    app: {
        name:  true ? _package2.default.name + ' (' + _package2.default.version + ')' : _package2.default.name + ' [' + _package2.default.version + ']',
        version: _package2.default.version,
        description: _package2.default.description
    },
    mail: {
        enable: true,
        transport: 'SMTP',
        fromaddress: '',
        options: {
            host: "smtp.gmail.com",
            port: 465,
            secureConnection: true,
            requiresAuth: true,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        }
    },
    session: {
        timeout: 30 * 24 * 60 * 60 * 1000
    },
    support: '',
    projectName: '',
    copyrightName: ''
};

exports.default = config;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var config = {
    mongodb: {
        hostaddress: 'mongodb://localhost',
        port: 27017,
        dbname: 'node_dice'
    },
    mongoStore: {
        url: 'mongodb://localhost/node_dice',
        autoRemove: 'interval',
        autoRemoveInterval: 10 // In minutes. Default 
    },
    bitcoin: {
        host: 'rpc.blockchain.info',
        port: 443,
        ssl: true,
        user: 'your identification',
        pass: 'your password'
    },
    faucet: {
        interval: 15 * 60 * 1000,
        min: 100,
        max: 500,
        proxy: null //try to use proxy to connect to google if blocked
    },
    origins: "*:*"
};

exports.default = config;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var config = {
    mongodb: {
        hostaddress: 'mongodb://localhost',
        port: 27017,
        dbname: 'node_dice',
        autoIndex: false
    },
    mongoStore: {
        url: 'mongodb://localhost/node_dice',
        autoRemove: 'interval',
        autoRemoveInterval: 10 // In minutes. Default 
    },
    port: 4000,
    origins: "*:*", //For security, it's better to set origins in prod
    bitcoin: {
        host: 'rpc.blockchain.info',
        port: 443,
        ssl: true,
        user: 'your identification',
        pass: 'your password'
    },
    faucet: {
        interval: 15 * 60 * 1000,
        min: 100,
        max: 500,
        proxy: null //try to use proxy to connect to google if blocked
    }

};

exports.default = config;

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = {
	"name": "nodedice_server",
	"description": "An open source dice game faucet built on node.js for BTC/NXT",
	"version": "2.0.0",
	"keywords": [
		"open source",
		"node.js",
		"nodejs dice btc faucet"
	],
	"homepage": "https://github.com/popmanhe/node_dice",
	"author": "Neo He",
	"repository": {
		"type": "git",
		"url": "https://github.com/popmanhe/node_dice"
	},
	"scripts": {
		"start": "npm-run-all --parallel open:src run:dev lint:watch",
		"build": "npm-run-all open:dist run:prod",
		"open:src": "babel-node tools/srcServer.js",
		"open:dist": "babel-node tools/distServer.js",
		"run:dev": "nodemon dist/nodeDiceServer.js --watch dist",
		"run:prod": "pm2 start dist/nodeDiceServer.js",
		"lint": "esw src --color",
		"lint:watch": "npm run lint -- --watch"
	},
	"config": {
		"unsafe-perm": true
	},
	"bugs": {
		"url": "https://github.com/popmanhe/node_dice/issues",
		"email": "popman.he@gmail.com"
	},
	"license": "MIT BSD",
	"dependencies": {
		"bitcoin": "^3.0.1",
		"body-parser": "^1.16.0",
		"bson": "^1.0.4",
		"compression": "^1.6.2",
		"connect-mongo": "^1.3.2",
		"cookie-parser": "^1.3.3",
		"cookieparser": "^0.1.0",
		"cors": "^2.8.1",
		"debug": "^2.6.0",
		"errorhandler": "^1.3.5",
		"express": "^4.15.2",
		"express-session": "^1.15.0",
		"express-validator": "^3.1.2",
		"lodash": "^4.17.4",
		"lru-cache": "^4.0.2",
		"method-override": "^2.3.8",
		"mongodb": "^2.2.25",
		"mongoose": "^4.9.2",
		"morgan": "^1.8.1",
		"nodemailer": "3.1.7",
		"request": "^2.81.0",
		"serve-favicon": "^2.4.2",
		"should": "^11.2.1",
		"socket.io": "^1.7.3",
		"uuid": "^3.0.1",
		"winston": "^2.3.1",
		"winston-daily-rotate-file": "^1.4.6"
	},
	"devDependencies": {
		"babel-cli": "^6.24.0",
		"babel-eslint": "7.1.1",
		"babel-loader": "^6.4.1",
		"babel-preset-es2015": "^6.24.0",
		"babel-preset-env": "^1.3.2",
		"babel-preset-stage-0": "^6.22.0",
		"debug": "~0.7.4",
		"eslint": "3.17.1",
		"eslint-plugin-import": "2.2.0",
		"eslint-plugin-node": "4.2.1",
		"eslint-watch": "3.0.1",
		"nodemon": "^1.11.0",
		"npm-run-all": "4.0.2",
		"webpack": "2.3.2",
		"webpack-bundle-analyzer": "2.3.1",
		"webpack-dev-middleware": "1.10.1",
		"webpack-hot-middleware": "2.18.0",
		"webpack-md5-hash": "0.0.5"
	}
};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("bitcoin");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("winston-daily-rotate-file");

/***/ })
/******/ ]);