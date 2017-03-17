/**
 * Copyright 2014 Node Dice
 *
 * Created by Neo on 2015/02/24.
 */

'use strict';

import dbhelp from './dbHelper';
import config from '../../config';

const mongoose = dbhelp.mongoose;
//const db = dbhelp.db;
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
    rollNum: Number,
    betId: String
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