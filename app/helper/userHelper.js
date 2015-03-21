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
    btcHelper = require('./bitcoinHelper.js');

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
                        depositAddress: '', depositAmount: 1000, 
                        withdrawAddress: '', withdrawAmount: 0,
                        profit: 0
                    },
                        {
                        coinName: 'NXT', 
                        depositAddress: '', balance: 10000000, 
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
    GetNewBtcAddress: function (userid, callback) {
        btcHelper.GetNewAddress(userid, function (err, addr) {
            userModel.findOne({ guid: userid }, "funds", function (err, u) {
                if (err) { callback(err, null); }
                else {
                    u.funds[0].depositAddress = addr;
                    u.save();
                    callback(err, { address: addr });
                }
            });
            
        });
        
    },
    GetBalance: function (userid, unit, callback) {
        //set unit=BTC for now
        btcHelper.GetBalance(userid, function (err, amount) {
            userModel.findOne({ guid: userid }, "funds", function (err, u) {
                if (err) { callback(err, null); }
                else {
                    u.funds[0].depositAmount = amount;
                    u.save();
                    var f = u.funds[0];
                    callback(err, { balance: f.depositAmount + f.profit - f.withdrawAmount });
                }
            });
        });
    }
};

var userModel = mongoose.model('User', userSchema);
 
/*exports models*/
module.exports = userModel;
