/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Ken on 2/08/2014
 */


'use strict';

module.exports = {
    mongodb: {
        hostaddress: 'mongodb://localhost',
        port: 27017,
        dbname: 'node_dice'
    },
    mongoStore:
 {
        url: 'mongodb://localhost/node_dice',
        autoRemove: 'interval',
        autoRemoveInterval: 10 // In minutes. Default 
    },
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
        proxy: 'http://localhost:8580' //try to use proxy to connect to google if blocked
    }
};
