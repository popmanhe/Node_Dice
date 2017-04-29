/**
 * Copyright 2017 Node Dice
 *
 * Created by Neo on 2017/03/27.
 */

//import config from '../../config';
import userModel from '../Models/userModel';
import betHelper from '../Models/betModel';
import rollDice from '../helper/cryptoroll';
import logger from '../helper/logger';
import _ from 'lodash';
const dice = (io) => {


    io.on('connection', (socket) => {
        const gameName = 'dice';
        socket.join(gameName);

        //return a 
        socket.on('ROLL', async (action) => {
            const clientBet = action.bet;
            try {
                let u = await userModel.GetUserById(socket.user.userid, "clientSalt serverSalt nonce funds");
                //validate input
                if (!_.isNumber(clientBet.w - 0)) {
                    socket.emit('action', { type: 'ERROR', errorCode: -3 });
                    return;
                }

                if (clientBet.w <= 0) {
                    socket.emit('action', { type: 'ERROR', errorCode: -2 });
                    return;
                }
                if (u.getBalance(clientBet.coinName) < clientBet.w) {// not enough fund
                    socket.emit('action', { type: 'ERROR', errorCode: -1 });
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
                    bet = await bet.save();
                }
                catch (err) {
                    logger.error('Saving bet error:' + err);
                    socket.emit('action', { type: 'ERROR', errorCode: -4 });
                    return;
                }

                //Todo: process bet's result here
                u.addProfit(clientBet.coinName, profit);
                try {

                    await u.save();
                }
                catch (err) {
                    logger.error('Saving user profit error:' + err);
                    socket.emit('action', { type: 'ERROR', errorCode: -5 });
                    return;
                }

                //Every bet is sent to everyone who is in over/under game. 
                const result = {
                    userid: socket.user.userid,
                    userName: socket.user.userName,
                    rollNum,
                    nonce: u.nonce,
                    betid: bet._id,
                    betTime: bet.betTime,
                    selNum: bet.selNum,
                    amount: bet.amount,
                    unit: bet.unit,
                    profit,
                    payout
                };

                io.volatile.to(gameName).emit('action', { type: 'ROLLED', bet: result });
            }
            catch (err) {
                logger.error(err);
                socket.emit('action', { type: 'ERROR', errorCode: -6 });
            }
        });

        socket.on('getMyBets', async () => {

            try {
                const bets = await betHelper.getBetsByUser(socket.user.userid);
                socket.emit('getMyBets', bets);
            }
            catch (err) {
                logger.error('GetBetsByUser error:' + err);
            }
        });

        socket.on('GET_ALLBETS', async () => {
            try {
                const bets = await betHelper.getAllBets();
                socket.emit('action', { type: 'RECV_ALLBETS', bets });
            }
            catch (err) {
                logger.error('getAllBets error:' + err);
            }
        });

        //update client salt
        socket.on('SAVE_CLIENTSALT', async (clientSalt) => {

            try {
                const oldSalt = await userModel.SaveClientSalt(socket.user.userid, clientSalt);

                socket.emit('action', { type: 'CLIENT_SALT', salt: oldSalt });
            }
            catch (err) {
                socket.emit('action', { type: 'ERROR', message: err });
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

export default dice;