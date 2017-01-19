/**
 * Copyright 2017 Node Dice
 *
 * Created by Neo on 2017/01/19.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dbHelper = require('./dbHelper');

var _dbHelper2 = _interopRequireDefault(_dbHelper);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _coinsConfig = require('../../config/coinsConfig.js');

var _coinsConfig2 = _interopRequireDefault(_coinsConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = _dbHelper2.default.db;
var mongoose = _dbHelper2.default.mongoose;
/*view models*/
/*user schema*/
var userSchema = new mongoose.Schema({
    guid: { type: String, index: true },
    userName: { type: String, index: { unique: true } },
    clientSalt: String,
    serverSalt: String,
    nonce: Number,
    createTime: { type: Date, expires: 60 * 60 * 24 * 30 }, //in production, remove expire attr
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
    for (var i in undefined.funds) {
        var fund = undefined.funds[i];
        if (fund.coinName == coinName) return fund;
    }
    return null;
};
userSchema.methods.getBalance = function (coinName) {

    var fund = undefined.getFund(coinName);
    if (fund) return fund.depositAmount - fund.withdrawAmount + fund.profit;

    return 0;
};
userSchema.methods.addProfit = function (coinName, profit) {

    var fund = undefined.getFund(coinName);
    if (fund) {
        fund.profit += profit;
        return fund;
    }
};
userSchema.methods.setDeposit = function (coinName, amount) {

    var fund = undefined.getFund(coinName);
    if (fund && amount) {
        fund.depositAmount = amount;
    }

    return fund;
};
userSchema.methods.setDepositAddr = function (coinName, addr) {

    var fund = undefined.getFund(coinName);
    if (fund) {
        fund.depositAddress = addr;
        return fund;
    }
};
//Static methods
userSchema.statics = {
    CreateNewUser: function CreateNewUser(username, callback) {
        var user = new userModel({
            guid: _uuid2.default.v4(),
            userName: username,
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
                console.error('Saving user error: ' + err);
            } else {
                callback(null, user);
            }
        });
    },
    GetUserById: function GetUserById(userid, fields, callback) {
        userModel.findOne({ guid: userid }, fields, callback);
    },
    SaveClientSalt: function SaveClientSalt(userid, clientSalt, callback) {
        userModel.findOne({ guid: userid }, "clientSalt serverSalt", function (err, u) {
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
                userModel.findOne({ guid: userid }, "funds", function (err, u) {
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
            userModel.findOne({ guid: userid }, "funds", function (err, u) {
                if (err) {
                    callback(err, null);
                } else {
                    var f = u.setDeposit(coinName, amount);
                    u.save();

                    callback(err, { balance: u.getBalance(coinName) });
                }
            });
        });
    }
};

var userModel = mongoose.model('User', userSchema);

/*exports models*/
exports.default = userModel;
//# sourceMappingURL=userHelper.js.map