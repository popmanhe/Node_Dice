/**
* Copyright 2014 Node Dice
*
* Created by Neo on 2014/11/27.
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _userHelper = require('../helper/userHelper');

var _userHelper2 = _interopRequireDefault(_userHelper);

var _betHelper = require('../helper/betHelper');

var _betHelper2 = _interopRequireDefault(_betHelper);

var _cryptoroll = require('../helper/cryptoroll');

var _cryptoroll2 = _interopRequireDefault(_cryptoroll);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gameName = 'overunder';

exports.default = function (io) {

    io.on('connection', function (socket) {

        socket.join(gameName);

        var session = socket.handshake.session;
        //return a 
        socket.on('roll', function (clientBet) {

            _userHelper2.default.GetUserById(session.userid, "clientSalt serverSalt nonce funds", function (err, u) {
                if (err) socket.emit('roll', { clientSalt: '', error: err });else {

                    //validate input
                    if (!_lodash2.default.isNumber(clientBet.w - 0)) {
                        socket.emit('rollResult', { code: -3 });
                        return;
                    }

                    if (clientBet.w <= 0) {
                        socket.emit('rollResult', { code: -2 });
                        return;
                    }
                    if (u.getBalance(clientBet.coinName) < clientBet.w) {
                        // not enough fund
                        socket.emit('rollResult', { code: -1 });
                        return;
                    }

                    //increase nonce
                    u.nonce++;

                    //get lucky number
                    var num = (0, _cryptoroll2.default)(u.serverSalt, u.clientSalt + '-' + u.nonce);
                    var bet = new _betHelper2.default({
                        userid: session.userid,
                        clientSalt: u.clientSalt,
                        serverSalt: u.serverSalt,
                        nonce: u.nonce,
                        amount: clientBet.w,
                        selNum: clientBet.sn,
                        unit: clientBet.coinName,
                        betTime: new Date(),
                        rollNum: num,
                        betId: _uuid2.default.v4()
                    });
                    bet.save(function (err) {
                        if (err) return console.error('Saving bet error:' + err);
                    });
                    //Todo: process bet's result here
                    u.addProfit(clientBet.coinName, GetProfit(bet.rollNum, bet.selNum, bet.amount));
                    u.save(function (err) {
                        if (err) return console.error('Saving user\'s profit error:' + err);
                    });
                    //Every bet is sent to everyone who is in over/under game. 
                    io.to(gameName).emit('allBets', {
                        userid: session.userid,
                        rollNum: num,
                        nonce: u.nonce,
                        betTime: bet.betTime,
                        selNum: bet.selNum,
                        amount: bet.amount,
                        unit: bet.unit
                    });
                }
            });
        });

        socket.on('getMyBets', function () {
            _betHelper2.default.GetBetsByUser(session.userid, function (err, bets) {
                if (err) return console.error('GetBetsByUser error:' + err);
                socket.emit('getMyBets', bets);
            });
        });

        socket.on('getAllBets', function () {
            _betHelper2.default.GetAllBets(function (err, bets) {
                if (err) return console.error('getAllBets error:' + err);
                socket.emit('getAllBets', bets);
            });
        });

        //functions
        var GetProfit = function GetProfit(rollNum, selNum, amount) {
            var payout = selNum <= 49.5 ? 99 / selNum : 99 / (100 - selNum);
            if (selNum * 1 <= 49.5 && rollNum * 1 <= selNum * 1 || selNum * 1 >= 50.5 && rollNum * 1 >= selNum * 1) {
                return amount * (payout - 1);
            } else {
                return -1 * amount;
            }
        };
    });
};
//# sourceMappingURL=s_overunder.js.map