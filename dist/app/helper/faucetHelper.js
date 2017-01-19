"use strict";

var dbhelp = require("./dbHelper"),
    db = dbhelp.db,
    config = require("../../config"),
    userHelper = require('./userHelper.js'),
    mongoose = dbhelp.mongoose;

var faucetSchema = new mongoose.Schema({
    lastTime: Date,
    userid: String
});
/*Static methods*/
faucetSchema.statics = {
    GetPay: function GetPay(userid, callback) {
        userHelper.GetUserById(userid, 'funds', function (err, u) {
            if (err) {
                callback(err, null);
            } else {
                faucetModel.findOne({ userid: userid }, 'lastTime', function (err, fa) {
                    var now = new Date();
                    if (!fa) {
                        fa = new faucetModel({
                            userid: userid,
                            lastTime: now
                        });
                    }

                    if (now == fa.lastTime || now - fa.lastTime >= config.faucet.interval) {
                        //send out bitcoin every 15 minutes

                        fa.lastTime = now;
                        fa.save();

                        var amount = randomIntInc(config.faucet.min, config.faucet.max);
                        var f = u.addProfit('BTC', amount * 0.00000001);
                        u.save();

                        callback(null, { code: 0, faucet: amount, balance: u.getBalance('BTC') });
                    } else {
                        callback(null, { code: -2, lastTime: fa.lastTime }); //too soon
                    }
                });
            }
        });
    }
};
/*functions*/
function randomIntInc(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

var faucetModel = mongoose.model('Faucet', faucetSchema);

module.exports = faucetModel;
//# sourceMappingURL=faucetHelper.js.map