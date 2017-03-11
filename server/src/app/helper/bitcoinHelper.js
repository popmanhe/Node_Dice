import bitcoin from 'bitcoin';
import config from '../../config';

const client = new bitcoin.Client(config.bitcoin);
export default {
    GetNewAddress: (userid, callback) =>{
        client.getNewAddress(userid, callback);
    },
    GetBalance: (userid, callback) => {
        //mini confirmation is 2, BTC only
        //Altcoin may need bigger confirmations.
        client.getReceivedByAccount(userid, 2, callback);
    },
    WithdrawFunds:  (userid, unit, callback) => { 
    
    }

}