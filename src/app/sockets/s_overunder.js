/**
 * Copyright 2014 Node Dice
 *
 * Created by Neo on 2014/11/27.
 */
'use strict';

import config from '../../config';
import uuid from 'uuid';
import userHelper from '../helper/userHelper';
import betHelper from '../helper/betHelper';
import rollDice from '../helper/cryptoroll';
import _ from 'lodash';
const gameName = 'overunder';

export default (io) => {
    
    
    io.on('connection', (socket) => {
        
        socket.join(gameName);
        
        let session = socket.handshake.session;
        //return a 
        socket.on('roll', (clientBet) => {
            
            userHelper.GetUserById(session.userid, "clientSalt serverSalt nonce funds",  (err, u) => {
                if (err)
                    socket.emit('roll', { clientSalt: '', error: err });
                else {
                    
                    //validate input
                    if (!_.isNumber(clientBet.w-0)) { 
                        socket.emit('rollResult', { code: -3 });
                        return;
                    }

                    if (clientBet.w <= 0) {
                        socket.emit('rollResult', { code: -2 });
                        return;
                    }
                    if (u.getBalance(clientBet.coinName) < clientBet.w) {// not enough fund
                        socket.emit('rollResult', { code: -1 });
                        return;
                    }

                    //increase nonce
                    u.nonce++;
                   
                    //get lucky number
                    let num = rollDice(u.serverSalt, u.clientSalt + '-' + u.nonce);
                    let bet = new betHelper({
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
                    bet.save((err) => {
                        if (err) return console.error('Saving bet error:' + err);
                    });
                    //Todo: process bet's result here
                    u.addProfit(clientBet.coinName, GetProfit(bet.rollNum, bet.selNum, bet.amount))
                    u.save((err) => {
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
        const  GetProfit = (rollNum, selNum, amount) => { 
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
