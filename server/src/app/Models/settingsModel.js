/**
 * Copyright 2017 Node Dice
 *
 * Created by Neo on 2017/02/24.
 */

import dbConnect from './dbConnect';
// import config from '../../config';

const mongoose = dbConnect.mongoose;
//const db = dbConnect.db;
/*bet schema*/
const settingsSchema = new mongoose.Schema({
    userid: String,
    userName: String,
    clientSalt: String,
    serverSalt: String,
    nonce: Number,
    amount: Number,
    selNum: Number,
    unit: String,
    betTime: { type: Date, index: true },
    rollNum: Number,
    profit: Number,
    payout: Number
});
//Static methods
settingsSchema.statics = {
    getBetsByUser: async (userid) => {
        return await settingsModel.find({ userid }, 'userid userName rollNum nonce betTime selNum amount unit profit payout')
            .sort({ betTime: -1 }).limit(100);

    },
    getAllBets: async () => {
        return await settingsModel.find({}, '_id userid userName rollNum nonce betTime selNum amount unit profit payout')
            .sort({ betTime: -1 }).limit(100);
    },
    getPayout: function (selNum) {
        return selNum <= 49.5 ? 99 / selNum : 99 / (99.99 - selNum);
    }

};

const settingsModel = mongoose.model('Bet', settingsSchema);

export default settingsModel;