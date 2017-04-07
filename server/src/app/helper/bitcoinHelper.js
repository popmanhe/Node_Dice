import bitcoin from 'bitcoin';
import config from '../../config';

const client = new bitcoin.Client(config.bitcoin);
export default {
    GetNewAddress: (userid, callback) => {
        client.getNewAddress(userid, callback);
    },
    GetBalance: (userid, callback) => {
        //mini confirmation is 2, BTC only
        //Altcoin may need bigger confirmations.

        // if (process.env.NODE_ENV == "development")
        //     //In development, return 10 BTC for testing.
            callback(null, 10);
        // else
        //     client.getReceivedByAccount(userid, 2, callback);
    },
    WithdrawFunds: (userid, unit) => {
        //dummy code for lint rules
        userid = '';
        unit = 'BTC';

        return unit;
    }

};