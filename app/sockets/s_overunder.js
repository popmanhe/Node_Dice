/**
 * Copyright 2014 Node Dice
 *
 * Created by Neo on 2014/11/27.
 */
'use strict';

var config = require("../../config"),
    uuid = require('node-uuid'),
    userHelper = require('../helper/userHelper'),
    betHelper = require('../helper/betHelper'),
    rollDice = require('../helper/cryptoroll'),
    _ = require('lodash'),
    gameName = 'overunder';

module.exports = function (io) {
    
    
    io.on('connection', function (socket) {
        
        socket.join(gameName);
        
        var session = socket.handshake.session;
        //return a 
        socket.on('roll', function (clientBet) {
           
            userHelper.GetUserById(session.userid, "clientSalt serverSalt nonce funds", function (err, u) {
                if (err)
                    socket.emit('roll', { clientSalt: '', error: err });
                else {
                    
                    //validate input
                    if (!_.isNumber(clientBet.w)) { 
                        socket.emit('rollResult', { code: -3 });
                        return;
                    }

                    if (clientBet.w <= 0) {
                        socket.emit('rollResult', { code: -2 });
                        return;
                    }
                    if (u.getBalance(clientBet.coinName) < clientBet.w) {
                        socket.emit('rollResult', { code: -1 });
                        return;
                    }

                    //increase nonce
                    u.nonce++;
                   
                    //get lucky number
                    var num = rollDice(u.serverSalt, u.clientSalt + '-' + u.nonce);
                    var bet = new betHelper({
                        userid: session.userid,
                        clientSalt: u.clientSalt,
                        serverSalt: u.serverSalt,
                        nonce: u.nonce,
                        amount: clientBet.w,
                        selNum: clientBet.sn,
                        unit: clientBet.coinName,
                        betTime: new Date(),
                        rollNum: num,
                        betId: uuid.v4()
                    });
                    bet.save(function (err) {
                        if (err) return console.error('Saving bet error:' + err);
                    });
                    //Todo: process bet's result here
                   
                    u.funds[0].profit += GetProfit(bet.rollNum, bet.selNum, bet.amount);
                    u.save(function (err) {
                        if (err) return console.error('Saving user\'s profit error:' + err);
                    });                                      
                    //Here, every bet is sent to everyone who is in over/under game. 
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
            betHelper.GetBetsByUser(session.userid, function (err, bets) {
                if (err) return console.error('GetBetsByUser error:' + err);
                socket.emit('getMyBets', bets);
            });
        });
        
        socket.on('getAllBets', function () {
            betHelper.GetAllBets(function (err, bets) {
                if (err) return console.error('getAllBets error:' + err);
                socket.emit('getAllBets', bets);
            });
        });


        //functions
        function GetProfit(rollNum, selNum, amount) { 
            var payout = selNum <= 49.5? 99 / selNum:99 / (100 - selNum);
            if ((selNum * 1 <= 49.5 && rollNum * 1 <= selNum * 1) 
             || (selNum * 1 >= 50.5 && rollNum * 1 >= selNum * 1)) {
                return amount * (payout - 1);
            }
            else {
               return -1 * amount;
            }
        }
    });
}
