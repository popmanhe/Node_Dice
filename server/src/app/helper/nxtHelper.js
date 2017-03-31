 
// import config from '../../config';
import uuid from 'uuid';
 
export default {
    GetNewAddress: (userid, callback) => {
        callback(null, uuid.v4());
    },
    GetBalance: (userid, callback) => {
        //mini confirmation is 2, BTC only
        //Altcoin may need bigger confirmations.

        if (process.env.NODE_ENV == "development")
            //In development, return 10 BTC for testing.
            callback(null, 1000000);
        else
            callback(null, 0);
    },
    WithdrawFunds: (userid, unit) => {
        //dummy code for lint rules
        userid = '';
        unit = 'NXT';

        return unit;
    }

};