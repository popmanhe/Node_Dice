'use strict';

//the seed pair itself
//var clientSeed = "your client seed"; //dont forget to exclude the dash and the nonce!
//var serverSeed = "your server seed";

//bet made with seed pair (excluding current bet)
//var nonce = 0;

//crypto lib for hmac function
var crypto = require('crypto');

module.exports = function (key, text) {

    //create HMAC using server seed as key and client seed as message
    var hash = crypto.createHmac('sha512', key).update(text).digest('hex');

    var index = 0;

    var lucky = parseInt(hash.substring(index * 5, index * 5 + 5), 16);

    //keep grabbing characters from the hash while greater than 
    while (lucky >= Math.pow(10, 6)) {
        index++;
        lucky = parseInt(hash.substring(index * 5, index * 5 + 5), 16);

        //if we reach the end of the hash, just default to highest number
        if (index * 5 + 5 > 128) {
            lucky = 99.99;
            break;
        }
    }

    lucky %= Math.pow(10, 4);
    lucky /= Math.pow(10, 2);

    return lucky;
};
//# sourceMappingURL=cryptoroll.js.map