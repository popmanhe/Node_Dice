/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Ken on 2/08/2014
 */

'use strict';

module.exports = {
    mongodb: {
        hostaddress: '127.0.0.1',
        port: 27017,
        dbname: 'node_dice'
    },
    mongostore:
 {
        url: 'mongodb://localhost/' + this.mongodb.dbname,
        autoRemove: 'interval',
        autoRemoveInterval: 10 // In minutes. Default 
    },
    port: 80
};
