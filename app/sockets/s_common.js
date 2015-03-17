/**
 * Copyright 2014 Node Dice
 *
 * Created by Neo on 2014/11/27.
 */
'use strict';

var config = require("../../config"),
    uuid = require('node-uuid'),
    userHelper = require('../helper/userHelper'),
    crypto = require('crypto');

module.exports = function (io) {
    
    io.on('connection', function (socket) {
        var session = socket.handshake.session;
        //return a new user
        socket.on('newUser', function (username) {
            session.userid = uuid.v4();
            session.username = username;
            session.save();
            var user = userHelper.CreateNewUser(session.userid, username);
            socket.emit('newUser', {
                userid: user.guid,
                userName: username,
                clientSalt: user.clientSalt, 
                funds: user.funds,
                hashedServerSalt: crypto.createHash('sha512').update(user.serverSalt).digest('hex')
            });
        });
        
        //return an existing user
        socket.on('existingUser', function () {
            userHelper.GetUserById(session.userid, "clientSalt serverSalt guid userName funds nonce",
                function (err, u) {
                if (err)
                    socket.emit('existingUser', { clientSalt: '', error: err });
                else {
                    if (u) {
                        //session.username = u.username;
                        //session.save();
                        socket.emit('existingUser', {
                            userid: u.guid,
                            userName: u.userName,
                            clientSalt: u.clientSalt , 
                            funds: u.funds,
                            nonce: u.nonce,
                            hashedServerSalt: crypto.createHash('sha512').update(u.serverSalt).digest('hex')
                        });
                    }
                    else {
                        socket.emit('existingUser', { clientSalt: '', error: 'session expired' });
                    }
                }
            });
        });
        
        //update client salt
        socket.on('clientSalt', function (clientSalt) {
            userHelper.SaveClientSalt(session.userid, clientSalt, function (err, oldSalt) {
                if (err)
                    socket.emit('savingClientSalt', err);
                else
                    socket.emit('savingClientSalt', oldSalt);
            });
        });

        //socket.on('disconnect', function () {
        //    io.emit('userDisconnected', {userName: session.username});
        //});
    });
}
