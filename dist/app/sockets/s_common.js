/**
* Copyright 2017 Node Dice
*
* Created by Neo on 2017/01/17.
*/
'use strict';

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _userHelper = require('../helper/userHelper');

var _userHelper2 = _interopRequireDefault(_userHelper);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _coinsConfig = require('../../config/coinsConfig.js');

var _coinsConfig2 = _interopRequireDefault(_coinsConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (io) {

    //socket.io events
    io.on('connection', function (socket) {
        var session = socket.handshake.session;
        socket.emit('coinNames', _coinsConfig2.default.getCoinNames());

        //return a new user
        socket.on('newUser', function (username) {
            _userHelper2.default.CreateNewUser(username, function (err, user) {
                if (err) {
                    if (err.code == 11000) socket.emit('newUser', { error: { code: 11000 } });
                } else {
                    session.userid = user.guid;
                    session.username = user.userName;
                    session.save();
                    var date = new Date();
                    date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000); // set day value to expiry
                    var expires = "expires=" + date.toGMTString();

                    socket.handshake.headers.cookie = "newUser=0;" + expires + "; path=/";
                    socket.emit('newUser', {
                        userid: user.guid,
                        userName: user.userName,
                        clientSalt: user.clientSalt,
                        funds: user.funds,
                        nonce: 0,
                        hashedServerSalt: _crypto2.default.createHash('sha512').update(user.serverSalt).digest('hex')
                    });
                }
            });
        });

        //return an existing user
        socket.on('existingUser', function () {
            _userHelper2.default.GetUserById(session.userid, "clientSalt serverSalt guid userName funds nonce", function (err, u) {
                if (err) {
                    socket.emit('existingUser', { clientSalt: '', error: err });
                } else {
                    if (u) {
                        socket.emit('existingUser', {
                            userid: u.guid,
                            userName: u.userName,
                            clientSalt: u.clientSalt,
                            funds: u.funds,
                            nonce: u.nonce,
                            hashedServerSalt: _crypto2.default.createHash('sha512').update(u.serverSalt).digest('hex')
                        });
                    } else {
                        socket.emit('existingUser', { clientSalt: '', error: 'session expired' });
                    }
                }
            });
        });

        //update client salt
        socket.on('clientSalt', function (clientSalt) {
            _userHelper2.default.SaveClientSalt(session.userid, clientSalt, function (err, oldSalt) {
                if (err) socket.emit('savingClientSalt', err);else socket.emit('savingClientSalt', oldSalt);
            });
        });

        //get new bitcion address
        socket.on('newCoinAddr', function (coinName) {
            _userHelper2.default.GetNewAddress(session.userid, coinName, function (err, addr) {
                if (err) socket.emit('newCoinAddr', err);else socket.emit('newCoinAddr', addr);
            });
        });

        //get user balance
        socket.on('getBalance', function (coinName) {
            _userHelper2.default.GetBalance(session.userid, coinName, function (err, balance) {
                if (err) socket.emit('getBalance', err);else socket.emit('getBalance', balance);
            });
        });
    });

    //functions
    function CreateNewUser() {}
};
//# sourceMappingURL=s_common.js.map