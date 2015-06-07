/**
 * Copyright 2014 Node Dice
 *
 * Created by Neo on 2014/11/27.
 */

'use strict';

var uuid = require('node-uuid'),
    dbhelp = require("./dbHelper"),
    db = dbhelp.db,
    mongoose = dbhelp.mongoose,
    config = require("../../config"),
    coinsConfig = require('../../config/coinsConfig.js');

/*view models*/
/*user schema*/
var userSchema = new mongoose.Schema({
    guid: { type: String, index: true },
    userName: { type: String, index: { unique: true } },
    clientSalt: String,
    serverSalt: String,
    nonce: Number,
    createTime: { type: Date, expires: 60 * 60 * 24 * 30 },//in production, remove expire attr
    funds: [{
            coinName: String,
            depositAmount: Number,
            depositAddress: String,
            withdrawAddress: String,
            withdrawAmount: Number,
            profit: Number,
        }]
}, { autoIndex: config.mongodb.autoIndex });
//Instance methods
userSchema.methods.getFund = function (coinName){
    for (var i in this.funds) {
            var fund = this.funds[i];
        if (fund.coinName == coinName)
            return fund;
    }
    return null;
}
userSchema.methods.getBalance = function (coinName) {
    
    var fund = this.getFund(coinName)
    if (fund)
        return fund.depositAmount - fund.withdrawAmount + fund.profit;

    return 0;
}
userSchema.methods.addProfit = function (coinName, profit){

    var fund = this.getFund(coinName)
    if (fund) {
        fund.profit += profit;
        return fund;
    }
}
userSchema.methods.setDeposit = function (coinName, amount) {
    
    var fund = this.getFund(coinName)
    if (fund && amount) {
        fund.depositAmount = amount;
    }

     return fund;
}
userSchema.methods.setDepositAddr = function (coinName, addr) {
    
    var fund = this.getFund(coinName)
    if (fund) {
        fund.depositAddress = addr;
        return fund;
    }
}
//Static methods
userSchema.statics = {
    CreateNewUser: function (username, callback) {
        var user = new userModel(
            {
                guid : uuid.v4(),
                userName: username,
                serverSalt : uuid.v4(),
                clientSalt : uuid.v4(),
                nonce : 0,
                createTime: new Date(),
                funds: [{
                        coinName: 'BTC', 
                        depositAddress: '', depositAmount: 0, 
                        withdrawAddress: '', withdrawAmount: 0,
                        profit: 0
                    },
                        {
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
            }
            else {
                callback(null, user);
            }
        });
    },
    GetUserById: function (userid, fields, callback) {
        userModel.findOne({ guid: userid }, fields, callback);
    },
    SaveClientSalt : function (userid, clientSalt, callback) {
        userModel.findOne({ guid: userid }, "clientSalt serverSalt", function (err, u) {
            if (err)
                callback({ error: err }, null);
            else {
                
                var _clientSalt, _serverSalt;
                _clientSalt = u.clientSalt;
                _serverSalt = u.serverSalt;
                
                u.clientSalt = clientSalt;
                u.serverSalt = uuid.v4();
                u.nonce = 0;
                u.save();
                callback(null, { clientSalt: _clientSalt, serverSalt: _serverSalt })
            }
        });
    },
    GetNewAddress: function (userid, coinName, callback) {
        var helper = coinsConfig[coinName];
        helper.GetNewAddress(userid, function (err, addr) {
            if (err) { 
                callback(err, null);
            }
            else {
                userModel.findOne({ guid: userid }, "funds", function (err, u) {
                    if (err) { callback(err, null); }
                    else {
                        u.setDepositAddr('BTC', addr);
                        u.save();
                        callback(err, { address: addr });
                    }
                });
            }    
        });
        
    },
    GetBalance: function (userid, coinName, callback) {
        
        var helper = coinsConfig[coinName];
        helper.GetBalance(userid, function (err, amount) {
            userModel.findOne({ guid: userid }, "funds", function (err, u) {
                if (err) { callback(err, null); }
                else {
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
module.exports = userModel;
