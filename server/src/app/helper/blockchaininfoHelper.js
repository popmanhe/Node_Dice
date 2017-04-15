import { MyWallet } from 'blockchain.info';
import config from '../../config';

const client = new MyWallet(config.bitcoin.user, config.bitcoin.pass, { api_host: config.bitcoin.host });
export default {
    GetNewAddress: async (userid) => await client.newAddress({ label: userid }),
    GetBalance:
    //(userid) => {
    () => {
        //mini confirmation is 2, BTC only
        //Altcoin may need bigger confirmations.

        // if (process.env.NODE_ENV == "development")
        //     //In development, return 10 BTC for testing.
        return 10;
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