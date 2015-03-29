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
    
    //socket.io events
    io.on('connection', function (socket) {
        var session = socket.handshake.session;
        
        //return a new user
        socket.on('newUser', function (username) {
            userHelper.CreateNewUser(username, function (err, user) {
                if (err) { 
                    if (err.code == 11000)
                        socket.emit('newUser', { error: { code: 11000 } });
                }
                else {
                    session.userid = user.guid;
                    session.username = user.userName;
                    session.save();
                    var date = new Date();
                    date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000)); // set day value to expiry
                    var expires = "expires=" + date.toGMTString();
                    
                    socket.handshake.headers.cookie = "newUser=0;" + expires + "; path=/";
                    socket.emit('newUser', {
                        userid: user.guid,
                        userName: user.userName,
                        clientSalt: user.clientSalt, 
                        funds: user.funds,
                        nonce: 0,
                        hashedServerSalt: crypto.createHash('sha512').update(user.serverSalt).digest('hex')
                    });
                }
            });
        });
        
        //return an existing user
        socket.on('existingUser', function () {
            userHelper.GetUserById(session.userid, "clientSalt serverSalt guid userName funds nonce",
                function (err, u) {
                if (err) {
                    socket.emit('existingUser', { clientSalt: '', error: err });
                }
                else {
                    if (u) {
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

        //get new bitcion address
        socket.on('newBtcAddr', function () {
            userHelper.GetNewBtcAddress(session.userid, function (err, addr) {
                if (err)
                    socket.emit('newBtcAddress', err);
                else
                    socket.emit('newBtcAddress', addr);
            });
        });

        //get user balance
        socket.on('getBalance', function (unit) {
            userHelper.GetBalance(session.userid, unit, function (err, balance) {
                if (err)
                    socket.emit('getBalance', err);
                else
                    socket.emit('getBalance', balance);
            });
        });
        
    });

    //functions
    function CreateNewUser() { }
}
