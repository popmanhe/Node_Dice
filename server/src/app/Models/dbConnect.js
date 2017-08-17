/**
 * Copyright 2017 Node Dice
 *
 * Created by Neo on 2017/08/15.
 */

import config from '../../config'; //request the config files.
import mongoose from 'mongoose';
//   ttl = require('mongoose-ttl');
mongoose.connect(config.mongodb.hostaddress + '/' + config.mongodb.dbname,
    { config: { autoIndex: config.mongodb.autoIndex } }); //connect to the mongodb driver.

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

export default {
    db
    , mongoose
};