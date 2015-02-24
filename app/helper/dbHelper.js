/**
 * Copyright 2014 Node Dice
 *
 * Created by Neo on 2014/11/27.
 */

'use strict';

var config = require("../../config"), //request the config files.
    mongoose = require('mongoose');
//   ttl = require('mongoose-ttl');
mongoose.connect(config.mongodb.hostaddress + '/' + config.mongodb.dbname); //connect to the mongodb driver.

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = {
    db: db
    , mongoose: mongoose
};