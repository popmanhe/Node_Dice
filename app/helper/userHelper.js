/**
 * Copyright 2014 Node Dice
 *
 * Created by Neo on 2014/11/27.
 */

'use strict';

var uuid = require('node-uuid'),
    dbhelp = require("./dbHelper"),
    db = dbhelp.db,
    mongoose = dbhelp.mongoose;

/*view models*/
/*user schema*/
var userSchema = new mongoose.Schema({
    guid: String,
    clientSalt: String,
    serverSalt: String,
    nonce: Number,
    funds: [{
            coinName: String,
            balance: Number,
            depositAddress: String,
            withdrawAddress: String
        }]
});


//userSchema.plugin(ttl, { ttl: 3600000 * 24, reap: false });
//betSchema.plugin(ttl, { ttl: 3600000, reap: false });

var userModel = mongoose.model('User', userSchema);
//userModel.startTTLReaper();
//betModel.startTTLReaper();
/*exports models*/
module.exports = {
    User : userModel,
    CreateNewUser: function (userid) {
        var user = new userModel(
            {
                guid : userid,
                serverSalt : uuid.v4(),
                clientSalt : uuid.v4(),
                nonce : 0,
                funds: [{ coinName: 'BTC', balance: 1000, depositAddress: '', withdrawAddress: '' },
                        { coinName: 'NXT', balance: 10000000, depositAddress: '', withdrawAddress: '' }]
            });
        
        user.save(function (err) {
            if (err) return console.error('Saving user error: ' + err);
        });
        return user;
    },
    GetUserById: function (userid, fields, callback) {
        userModel.findOne({ guid: userid }, fields, callback);
    },
    SaveClientSalt : function (userid, clientSalt) {
        userModel.findOne({ guid: session.userid }, "clientSalt", function (err, u) {
            if (err)
                socket.emit('savingClientSalt', { 'clientSalt': clientSalt, error: err });
            else {
                //increase nonce
                u.clientSalt = clientSalt;
                u.save();
            }
        });
    }
};
