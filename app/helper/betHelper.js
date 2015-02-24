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
    betTime: Date,
    rollNum: Number,
    betId: String
});

var betModel = mongoose.model('Bet', betSchema);

module.exports = {
    Bet : betModel
};