/**
 * Copyright 2014 Node Dice
 *
 * Created by Neo on 2014/11/27.
 */

import config from '../../config'; //request the config files.
import mongoose from 'mongoose';
//   ttl = require('mongoose-ttl');
mongoose.connect(config.mongodb.hostaddress + '/' + config.mongodb.dbname); //connect to the mongodb driver.

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

export default {
    db
    , mongoose
};