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
    clientSalt: String,
    serverSalt: String,
    nonce: Number,
    amount: Number,
    selNum: Number,
    unit: String,
    betTime: { type: Date, expires: 60 * 60 * 24 * 30, index: true },
    rollNum: Number
}, { autoIndex: config.mongodb.autoIndex });
//Static methods
betSchema.statics = {
    GetBetsByUser: function (userid, callback) {
        const query = betModel.find({ userid: userid }, 'rollNum nonce betTime selNum amount unit', { limit: 100 });
        query.sort({ betTime: -1 }).exec(callback);
    },
    GetAllBets: function (callback) {
        const query = betModel.find({}, 'rollNum nonce betTime selNum amount unit', { limit: 100 });
        query.sort({ betTime: -1 }).exec(callback);
    }
};

const betModel = mongoose.model('Bet', betSchema);

export default betModel;