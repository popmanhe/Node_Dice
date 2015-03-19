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
        dbname: 'node_dice',
        autoIndex: false
    },
    mongoStore: {
        url: 'mongodb://localhost/node_dice',
        autoRemove: 'interval',
        autoRemoveInterval: 10 // In minutes. Default 
    },
    port: 80,
    bitcoin:
    {
        host: 'rpc.blockchain.info',
        port: 443,
        ssl: true,
        user: 'your identification',
        pass: 'your password'
    }

};
