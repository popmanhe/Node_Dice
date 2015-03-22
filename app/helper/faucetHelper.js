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
    GetPay: function (userid, callback) {
        userHelper.GetUserById(userid, 'funds', function (err, u) {
            if (err) {
                callback(err, null);
            }
            else {
                faucetModel.findOne({ userid: userid }, 'lastTime', function (err, fa) {
                    var now = new Date();
                    if (!fa) {
                            fa = new faucetModel({
                                userid: userid,
                                lastTime: now
                            });
                            fa.save();
                        }
                    else if ((now - fa.lastTime) >= 15 * 60 * 1000) { //send out bitcoin every 15 minutes
                        
                            fa.lastTime = now;
                        
                            fa.save();

                            var amount = randomIntInc(100, 500);
                            u.funds[0].profit += amount * 0.00000001;//100-500 sato
                            u.save();
                        
                            var f = u.funds[0];
                            callback(null, { balance: f.depositAmount + f.profit - f.withdrawAmount });
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