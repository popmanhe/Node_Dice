'use strict';

const config = {
    mongodb: {
        hostaddress: 'mongodb://mongo',
        port: 27017,
        dbname: 'node_dice',
        autoIndex: false
    },
    // mongoStore: {
    //     url: 'mongodb://localhost/node_dice',
    //     autoRemove: 'interval',
    //     autoRemoveInterval: 10 // In minutes. Default 
    // },
    port: 4000,
    origins: "*:*", //For security, it's better to set origins in prod
    bitcoin:
    {
        host: 'rpc.blockchain.info',
        port: 443,
        ssl: true,
        user: 'your identification',
        pass: 'your password'
    },
    faucet:
    {
        interval: 15 * 60 * 1000,
        min: 100,
        max: 500,
        proxy: null //try to use proxy to connect to google if blocked
    }

};

export default config;