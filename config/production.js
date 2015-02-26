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
    mongoStore: {
        url: 'mongodb://localhost/node_dice',
        autoRemove: 'interval',
        autoRemoveInterval: 10 // In minutes. Default 
    },
    port: 80
};
