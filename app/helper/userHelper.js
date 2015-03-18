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
    btcHelper = require('./bitcoinHelper.js');

/*view models*/
/*user schema*/
var userSchema = new mongoose.Schema({
    guid: String,
    userName: String,
    clientSalt: String,
    serverSalt: String,
    nonce: Number,
    funds: [{
            coinName: String,
            balance: Number,
            depositAddress: String,
            withdrawAddress: String,
            withdrawAmount: Number,
            profit: Number,
        }]
}, { autoIndex: false });
userSchema.index({guid: 1})

//userSchema.plugin(ttl, { ttl: 3600000 * 24, reap: false });
//betSchema.plugin(ttl, { ttl: 3600000, reap: false });

var userModel = mongoose.model('User', userSchema);
//userModel.startTTLReaper();
//betModel.startTTLReaper();
/*exports models*/
module.exports = {
    User : userModel,
    CreateNewUser: function (userid, username) {
        var user = new userModel(
            {
                guid : userid,
                userName: username,
                serverSalt : uuid.v4(),
                clientSalt : uuid.v4(),
                nonce : 0,
                funds: [{
                            coinName: 'BTC', 
                            depositAddress: '', balance: 1000, 
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
            if (err) return console.error('Saving user error: ' + err);
        });
        return user;
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
                callback(null,{ clientSalt: _clientSalt, serverSalt: _serverSalt })
            }
        });
    },
    GetNewBtcAddress: function (userid, callback) {
        btcHelper.GetNewAddress(userid, function (err, addr) {
            userModel.findOne({ guid: userid }, "funds", function (err, u) {
                if (err)
                    {callback(err, null);}
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
                if (err)
                    {callback(err, null);}
                else {
                    u.funds[0].balance = amount;
                    u.save();
                    var f = u.funds[0];
                    callback(err, { balance: f.balance + f.profit - f.withdrawAmount });
                }
            });
        });
    }
};
