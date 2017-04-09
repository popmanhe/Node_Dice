/**
 * Copyright 2017 Node Dice
 *
 * Created by Neo on 2017/03/27.
 */

//import config from '../../config';
import userHelper from '../Models/userModel';
import betHelper from '../Models/betModel';
import rollDice from '../helper/cryptoroll';
import _ from 'lodash';


const overunder = (io) => {

    io.on('connection', (socket) => {
        const gameName = 'overunder';
        socket.join(gameName);

        //return a 
        socket.on('roll', (clientBet) => {

            userHelper.GetUserById(socket.user.userid, "clientSalt serverSalt nonce funds", (err, u) => {
                if (err)
                    socket.emit('rollError', { code: -6 });
                else {

                    //validate input
                    if (!_.isNumber(clientBet.w - 0)) {
                        socket.emit('rollError', { code: -3 });
                        return;
                    }

                    if (clientBet.w <= 0) {
                        socket.emit('rollError', { code: -2 });
                        return;
                    }
                    if (u.getBalance(clientBet.coinName) < clientBet.w) {// not enough fund
                        socket.emit('rollError', { code: -1 });
                        return;
                    }

                    //increase nonce
                    u.nonce++;

                    //get lucky number
                    let rollNum = rollDice(u.serverSalt, u.clientSalt + '-' + u.nonce);
                    const payout = betHelper.getPayout(clientBet.sn);
                    const profit = GetProfit(rollNum, clientBet.sn, clientBet.w, payout);
                    let bet = new betHelper({
                        userid: socket.user.userid,
                        userName: socket.user.userName,
                        clientSalt: u.clientSalt,
                        serverSalt: u.serverSalt,
                        nonce: u.nonce,
                        amount: clientBet.w,
                        selNum: clientBet.sn,
                        unit: clientBet.coinName,
                        betTime: new Date(),
                        rollNum,
                        profit,
                        payout
                    });
                    bet.save((err) => {
                        if (err) {
                            console.error('Saving bet error:' + err);
                            socket.emit('rollError', { code: -4 });
                            return;
                        }
                    });
                    //Todo: process bet's result here

                    u.addProfit(clientBet.coinName, profit);
                    u.save((err) => {
                        if (err) {
                            console.error('Saving user\'s profit error:' + err);
                            socket.emit('rollError', { code: -5 });
                            return;
                        }
                    });
                    //Every bet is sent to everyone who is in over/under game. 
                    const result = {
                        userid: socket.user.userid,
                        userName: socket.user.userName,
                        rollNum,
                        nonce: u.nonce,
                        betTime: bet.betTime,
                        selNum: bet.selNum,
                        amount: bet.amount,
                        unit: bet.unit,
                        profit,
                        payout
                    };

                    io.to(gameName).emit('allBets', result);
                }
            });
        });

        socket.on('getMyBets', function () {
            betHelper.getBetsByUser(socket.user.userid, function (err, bets) {
                if (err) return console.error('GetBetsByUser error:' + err);
                socket.emit('getMyBets', bets);
            });
        });
 
        socket.on('getAllBets', function () {
            betHelper.getAllBets(function (err, bets) {
                if (err) return console.error('getAllBets error:' + err);
                socket.emit('getAllBets', bets);
            });
        });

        //functions
        const GetProfit = (rollNum, selNum, amount, payout) => {

            if ((selNum * 1 <= 49.5 && rollNum * 1 <= selNum * 1)
                || (selNum * 1 >= 50.49 && rollNum * 1 >= selNum * 1)) {
                return amount * (payout - 1);
            }
            else {
                return -1 * amount;
            }
        };
    });
};

export default overunder;