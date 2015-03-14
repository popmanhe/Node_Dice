/**
 * Copyright 2014 Node Dice
 *
 * Created by Neo on 2015/02/24.
 */

'use strict';

var dbhelp = require("./dbHelper"),
    db = dbhelp.db,
    mongoose = dbhelp.mongoose;

/*bet schema*/
var betSchema = new mongoose.Schema({
    userid: String,
    clientSalt: String,
    serverSalt: String,
    nonce: Number,
    amount: Number,
    selNum: Number,
    unit: String,
    betTime: { type: Date, expires: 60 * 60 * 24 * 30 },
    rollNum: Number,
    betId: String
}, { autoIndex: false });
betSchema.index({betTime: -1, userid: 1});
var betModel = mongoose.model('Bet', betSchema);

module.exports = {
    Bet : betModel,
    GetBetsByUser: function (userid, callback) {
        var query = betModel.find({ userid: userid }, 'rollNum nonce betTime selNum amount unit', { limit: 100 });
        query.sort({ betTime: -1 }).exec(callback);
    },
    GetAllBets: function (callback) {
        var query = betModel.find({}, 'rollNum nonce betTime selNum amount unit', { limit: 100 });
        query.sort({ betTime: -1 }).exec(callback);
    }
};