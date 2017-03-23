/**
 * Copyright 2017 Node Dice
 *
 * Created by Neo on 2017/01/19.
 */

'use strict';
import dbhelp from './dbHelper';
import config from '../../config';
import coinsConfig from '../../config/coinsConfig.js';

const mongoose = dbhelp.mongoose;
/*view models*/
/*user schema*/
const sessionSchema = new mongoose.Schema({
    sessionID: { type: String, index: { unique: true } },
    userID: { type: String} 
}, { autoIndex: config.mongodb.autoIndex });


//Static methods
sessionSchema.statics = {
    CrateNewSession: (session, callback) => {
        let s = new userModel(
            {
                sessionID: session.sessionID,
                userID: session.userID
            });
        
        s.save(err => {
            if (err) {
                callback(err, null);
                console.error('Saving user error: ' + err);
            }
            else {
                callback(null, session);
            }
        });
    },
  
};

const sessionModel = mongoose.model('User', sessionSchema);
 
/*exports models*/
export default sessionModel;
