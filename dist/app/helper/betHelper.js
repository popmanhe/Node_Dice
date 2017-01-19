/**
* Copyright 2014 Node Dice
*
* Created by Neo on 2015/02/24.
*/

'use strict';

var _dbHelper = require('./dbHelper');

var _dbHelper2 = _interopRequireDefault(_dbHelper);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = _dbHelper2.default.mongoose;
var db = _dbHelper2.default.db;
/*bet schema*/
var betSchema = new mongoose.Schema({
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
}, { autoIndex: _config2.default.mongodb.autoIndex });
//Static methods
betSchema.statics = {
    GetBetsByUser: function GetBetsByUser(userid, callback) {
        var query = betModel.find({ userid: userid }, 'rollNum nonce betTime selNum amount unit', { limit: 100 });
        query.sort({ betTime: -1 }).exec(callback);
    },
    GetAllBets: function GetAllBets(callback) {
        var query = betModel.find({}, 'rollNum nonce betTime selNum amount unit', { limit: 100 });
        query.sort({ betTime: -1 }).exec(callback);
    }
};

var betModel = mongoose.model('Bet', betSchema);

module.exports = betModel;
//# sourceMappingURL=betHelper.js.map