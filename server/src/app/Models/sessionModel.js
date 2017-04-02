/**
 * Copyright 2017 Node Dice
 *
 * Created by Neo on 2017/01/19.
 */

import dbConnect from './dbConnect';
import config from '../../config';

const mongoose = dbConnect.mongoose;
/*view models*/
/*user schema*/
const sessionSchema = new mongoose.Schema({
    sessionID: { type: String, index: { unique: true } },
    userID: { type: String} 
}, { autoIndex: config.mongodb.autoIndex });


//Static methods
sessionSchema.statics = {
    // CrateNewSession: (session, callback) => {
         
    // },
  
};

const sessionModel = mongoose.model('Session', sessionSchema);
 
/*exports models*/
export default sessionModel;
