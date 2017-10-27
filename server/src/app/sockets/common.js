/**
 * Copyright 2017 Node Dice
 *
 * Created by Neo on 2017/01/17.
 */
import userModel from '../Models/userModel';
import coinsConfig from '../../config/coinsConfig.js';
import logger from '../helper/logger';
import crypto from 'crypto';
export default (io) => {

    //socket.io events
    io.on('connection', (socket) => {

        socket.on('GET_COINNAMES', () =>
            socket.emit('action', { type: 'SET_COINNAMES', coins: coinsConfig.getCoinNames() })
        );

        //return a new user
        socket.on('SIGNUP_USER', async (u) => {

            try {
                const user = await userModel.CreateNewUser(u.user.userName, u.user.password);
                
                const newUser = {
                    userid: user._id,
                    userName: user.userName,
                    clientSalt: user.clientSalt,
                    funds: user.funds,
                    nonce: 0,
                    hashedServerSalt: crypto.createHash('sha512').update(user.serverSalt).digest('hex')
                };
                socket.user = { userid: newUser.userid, userName: newUser.userName };
                socket.emit('action', { type: 'NEW_USER', user: newUser });
            }
            catch (err) {
                if (err.code == 11000)
                    socket.emit('action', { type: 'ERROR', errorCode: 11000 });
                else {
                    logger.error(err);
                    socket.emit('action', { type: 'ERROR', message: 'Internal error. Try later.' });
                }
            }

        });

        //return an existing user
        // socket.on('existingUser', async () => {
        //     try {
        //         const u = await userModel.GetUserById(socket.user.userid, "clientSalt serverSalt _id userName funds nonce");

        //         if (u) {
        //             socket.emit('existingUser', {
        //                 userid: u._id,
        //                 userName: u.userName,
        //                 clientSalt: u.clientSalt,
        //                 funds: u.funds,
        //                 nonce: u.nonce,
        //                 hashedServerSalt: crypto.createHash('sha512').update(u.serverSalt).digest('hex')
        //             });
        //         }
        //         else {
        //             socket.emit('existingUser', { clientSalt: '', error: 'session expired' });
        //         }
        //     }
        //     catch (err) {
        //         logger.error(err);
        //         socket.emit('action', {type: 'ERROR', message: err });
        //     }
        // });


        //get new bitcion address
        socket.on('NEW_COINADDR', async (coinName) => {

            try {
                const addr = await userModel.GetNewAddress(socket.user.userid, coinName);
                socket.emit('NEW_COINADDR', addr);
            }
            catch (err) {
                logger.error(err);
                socket.emit('action', { type: 'ERROR', message: err });
            }
        });

        //get user balance
        socket.on('REFRESH_BALANCE', async () => {

            try {
                const funds = await userModel.GetBalance(socket.user.userid);
                socket.emit('action', {type: 'REFRESH_BALANCE', funds});
            }
            catch (err) {
                logger.info(err);
                socket.emit('action', { type: 'ERROR', message: 'Internal error. Try later.' });
            }
        });

    });
};
