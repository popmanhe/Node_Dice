import dbhelp from './dbHelper';
import config from '../../config';
import userHelper from './userHelper.js';
const mongoose = dbhelp.mongoose;

const faucetSchema = new mongoose.Schema({
    lastTime: Date,
    userid: String
});
/*Static methods*/
faucetSchema.statics = {
    GetPay:  (userid, callback) => {
        userHelper.GetUserById(userid, 'funds', (err, u) =>{
            if (err) {
                callback(err, null);
            }
            else {
                faucetModel.findOne({ userid: userid }, 'lastTime', (err, fa) => {
                    let now = new Date();
                    if (!fa) {
                            fa = new faucetModel({
                                userid: userid,
                                lastTime: now
                            });
                    }

                    if ((now == fa.lastTime) || (now - fa.lastTime) >= config.faucet.interval) { //send out bitcoin every 15 minutes
                        
                        fa.lastTime = now;
                        fa.save();
                        
                        let amount = randomIntInc(config.faucet.min, config.faucet.max);
                        u.addProfit('BTC', amount * 0.00000001);
                         u.save();
                        
                        
                        callback(null, {code: 0, faucet:amount,  balance: u.getBalance('BTC') });
                    } 
                    else { 
                        callback(null, {code: -2, lastTime: fa.lastTime }); //too soon
                    }
                    });
            }
        });
    }
};
/*functions*/
const randomIntInc =(low, high) => {
    return Math.floor(Math.random() * (high - low + 1) + low);
}
;
const faucetModel = mongoose.model('Faucet', faucetSchema);

export default faucetModel;