/**
 * Copyright 2017 Node Dice
 *
 * Created by Neo on 2017/08/19.
 */

import dbConnect from './dbConnect';
import config from '../../config';
import uuid from 'uuid';
import coinsConfig from '../../config/coinsConfig.js';
import crypto from 'crypto';
// import logger from '../helper/logger';
const mongoose = dbConnect.mongoose;
mongoose.Promise = global.Promise;
/*view models*/
/*user schema*/
const userSchema = new mongoose.Schema({
    userName: { type: String, index: { unique: true } },
    password: { type: String },
    clientSalt: String,
    serverSalt: String,
    nonce: Number,
    createTime: { type: Date },
    userType: Number,
    isLocked: Boolean,
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
userSchema.methods.getFund = function (coinName) {
    for (let i in this.funds) {
        let fund = this.funds[i];
        if (fund.coinName == coinName)
            return fund;
    }
    return null;
};

userSchema.methods.getBalance = function (coinName) {

    let fund = this.getFund(coinName);
    if (fund)
        return fund.depositAmount - fund.withdrawAmount + fund.profit;

    return 0;
};

userSchema.methods.addProfit = function (coinName, profit) {

    let fund = this.getFund(coinName);
    if (fund) {
        fund.profit += profit;
        return fund;
    }
};

userSchema.methods.setDeposit = function (coinName, amount) {

    let fund = this.getFund(coinName);
    if (fund && amount) {
        fund.depositAmount = amount;
    }

    return fund;
};

userSchema.methods.getDepositAddr = async function (coinName) {
    let helper = coinsConfig[coinName];
    const addr = await helper.GetNewAddress(this._id, coinName);

    this.setDepositAddr(coinName, addr);
    return addr;
};

userSchema.methods.setDepositAddr = function (coinName, addr) {

    let fund = this.getFund(coinName);
    if (fund) {
        fund.depositAddress = addr;
        return fund;
    }
};

//Static methods
userSchema.statics = {
    CreateNewUser: async (userName, password) => {
        
        password = crypto.createHash('sha512').update(password).digest('hex');
        let user = new userModel(
            {
                userName: userName,
                password: password,
                serverSalt: uuid.v4(),
                clientSalt: uuid.v4(),
                nonce: 0,
                createTime: new Date(),
                funds: [{
                    coinName: 'BTC',
                    depositAddress: '', depositAmount: config.initBTCAmount, 
                    withdrawAddress: '', withdrawAmount: 0,
                    profit: 0
                },
                {
                    coinName: 'NXT',
                    depositAddress: '', depositAmount: config.initNXTAmount,
                    withdrawAddress: '', withdrawAmount: 0,
                    profit: 0
                }]
            });

        return await user.save();
    },
    GetUserById: async (userid, fields) => {
        return await userModel.findOne({ _id: userid }, fields);
    },
    SaveClientSalt: async (userid, clientSalt) => {

        let u = await userModel.findOne({ _id: userid }, "clientSalt serverSalt");
        let _clientSalt, _serverSalt;
        _clientSalt = u.clientSalt;
        _serverSalt = u.serverSalt;

        u.clientSalt = clientSalt;
        u.serverSalt = uuid.v4();
        u.nonce = 0;
        await u.save();
        return { clientSalt: _clientSalt, serverSalt: _serverSalt };

    },
    GetNewAddress: async (userid, coinName) => {

        let u = await userModel.findOne({ _id: userid }, "funds");
        const addr = u.getDepositAddr(coinName);
        await u.save();
        return addr;
    },
    GetBalance: async (userid) => {


        const u = await userModel.findOne({ _id: userid }, "funds");
        return u.funds;
    },
    LoginUser: async (userName, password) => {
        password = crypto.createHash('sha512').update(password).digest('hex');
        return await userModel.findOne({ userName, password }, "_id userName serverSalt clientSalt nonce funds userType isLocked");
    }
};

const userModel = mongoose.model('User', userSchema);

/*exports models*/
export default userModel;
