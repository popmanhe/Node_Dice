/**
 * Copyright 2017 Node Dice
 *
 * Created by Neo on 2017/03/27.
 */

//import config from '../../config';
import userHelper from '../Models/userModel';
import betHelper from '../Models/betModel';
import rollDice from '../helper/cryptoroll';
import logger from '../helper/logger';
import _ from 'lodash';
const overunder = (io) => {


    io.on('connection', (socket) => {
        const gameName = 'overunder';
        socket.join(gameName);
        const validateUser = (user) => {
            if (!user || !user.userid) {
                socket.emit('invalidUser', {});
                return false;
            }
            return true;
        };
        //return a 
        socket.on('roll', async (clientBet) => {
            if (!validateUser(socket.user)) return;
            try {
                let u = await userHelper.GetUserById(socket.user.userid, "clientSalt serverSalt nonce funds");
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
                try {
                    await bet.save();
                }
                catch (err) {
                    logger.error('Saving bet error:' + err);
                    socket.emit('rollError', { code: -4 });
                    return;
                }

                //Todo: process bet's result here
                u.addProfit(clientBet.coinName, profit);
                try {

                    await u.save();
                }
                catch (err) {
                    logger.error('Saving user profit error:' + err);
                    socket.emit('rollError', { code: -5 });
                    return;
                }

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
            catch (err) {
                logger.error(err);
                socket.emit('rollError', { code: -6 });
            }
        });

        socket.on('getMyBets', async () => {
            if (!validateUser(socket.user)) return;
            try {
                const bets = await betHelper.getBetsByUser(socket.user.userid);
                socket.emit('getMyBets', bets);
            }
            catch (err) {
                logger.error('GetBetsByUser error:' + err);
            }
        });

        socket.on('getAllBets', async () => {
            try {
                const bets = await betHelper.getAllBets();
                socket.emit('getAllBets', bets);
            }
            catch (err) {
                logger.error('getAllBets error:' + err);
            }
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