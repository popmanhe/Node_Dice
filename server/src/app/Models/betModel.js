/**
 * Copyright 2017 Node Dice
 *
 * Created by Neo on 2017/02/24.
 */

import dbConnect from './dbConnect';
import config from '../../config';

const mongoose = dbConnect.mongoose;
//const db = dbConnect.db;
/*bet schema*/
const betSchema = new mongoose.Schema({
    userid: String,
    userName: String,
    clientSalt: String,
    serverSalt: String,
    nonce: Number,
    amount: Number,
    selNum: Number,
    unit: String,
    betTime: { type: Date, expires: 60 * 60 * 24 * 30, index: true },
    rollNum: Number,
    profit: Number,
    payout: Number
}, { autoIndex: config.mongodb.autoIndex });
//Static methods
betSchema.statics = {
    getBetsByUser: function (userid, callback) {
        const query = betModel.find({ userid: userid }, 'userid userName rollNum nonce betTime selNum amount unit profit payout', { limit: 100 });
        query.sort({ betTime: -1 }).exec(callback);
    },
    getAllBets: function (callback) {
        const query = betModel.find({}, 'userid userName rollNum nonce betTime selNum amount unit profit payout', { limit: 100 });
        query.sort({ betTime: -1 }).exec(callback);
    },
    getPayout: function(selNum){
      return  selNum <= 49.5 ? 99 / selNum : 99 / (99.99 - selNum);
    }
    
};

const betModel = mongoose.model('Bet', betSchema);

export default betModel;