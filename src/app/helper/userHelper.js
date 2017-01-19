/**
 * Copyright 2014 Node Dice
 *
 * Created by Neo on 2014/11/27.
 */

'use strict';
import dbhelp from './dbHelper';
import config from '../../config';
import uuid from 'uuid';
import coinsConfig from '../../config/coinsConfig.js';

const db = dbhelp.db;
const mongoose = dbhelp.mongoose;
/*view models*/
/*user schema*/
const userSchema = new mongoose.Schema({
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
    for (let i in this.funds) {
            let fund = this.funds[i];
        if (fund.coinName == coinName)
            return fund;
    }
    return null;
}
userSchema.methods.getBalance = function (coinName) {
    
    let fund = this.getFund(coinName)
    if (fund)
        return fund.depositAmount - fund.withdrawAmount + fund.profit;

    return 0;
}
userSchema.methods.addProfit = function (coinName, profit){

    let fund = this.getFund(coinName)
    if (fund) {
        fund.profit += profit;
        return fund;
    }
}
userSchema.methods.setDeposit = function (coinName, amount) {
    
    let fund = this.getFund(coinName)
    if (fund && amount) {
        fund.depositAmount = amount;
    }

     return fund;
}
userSchema.methods.setDepositAddr = function (coinName, addr) {
    
    let fund = this.getFund(coinName)
    if (fund) {
        fund.depositAddress = addr;
        return fund;
    }
}
//Static methods
userSchema.statics = {
    CreateNewUser: function (username, callback) {
        let user = new userModel(
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
    GetUserById: (userid, fields, callback) => {
        userModel.findOne({ guid: userid }, fields, callback);
    },
    SaveClientSalt : (userid, clientSalt, callback) => {
        userModel.findOne({ guid: userid }, "clientSalt serverSalt", (err, u) => {
            if (err)
                callback({ error: err }, null);
            else {
                
                let _clientSalt, _serverSalt;
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
    GetNewAddress: (userid, coinName, callback) => {
        let helper = coinsConfig[coinName];
        helper.GetNewAddress(userid, (err, addr) => {
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
        
        let helper = coinsConfig[coinName];
        helper.GetBalance(userid, function (err, amount) {
            userModel.findOne({ guid: userid }, "funds", function (err, u) {
                if (err) { callback(err, null); }
                else {
                    let f = u.setDeposit(coinName, amount);
                    u.save();
                     
                    callback(err, { balance: u.getBalance(coinName) });
                }
            });
        });
    }
};

let userModel = mongoose.model('User', userSchema);
 
/*exports models*/
export default userModel;
