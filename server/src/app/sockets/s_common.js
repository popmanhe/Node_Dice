/**
 * Copyright 2017 Node Dice
 *
 * Created by Neo on 2017/01/17.
 */
import userModel from '../Models/userModel';
import crypto from 'crypto';
import coinsConfig from '../../config/coinsConfig.js';
import logger from '../helper/logger';

export default (io) => {

    //socket.io events
    io.on('connection', (socket) => {
        const validateUser = (user) => {
            if (!user || !user.userid) {
                socket.emit('invalidUser',{});
                return false;
            }
            return true;
        };

        // const session = socket.handshake.session;
        socket.on('coinNames', () =>
            socket.emit('coinNames', coinsConfig.getCoinNames())
        );


        //return a new user
        socket.on('newUser', async (u) => {

            try {
                const user = await userModel.CreateNewUser(u.userName, u.password);
                 const newUser = {
                    userid: user._id,
                    userName: user.userName,
                    clientSalt: user.clientSalt,
                    funds: user.funds,
                    nonce: 0,
                    hashedServerSalt: crypto.createHash('sha512').update(user.serverSalt).digest('hex')
                };
                socket.user = { userid: newUser.userid, userName: newUser.userName };
                socket.emit('newUser', newUser);
            }
            catch (err) {
                if (err.code == 11000)
                    socket.emit('newUser', { error: { code: 11000 } });
                else {
                    logger.error(err);
                    socket.emit('newUser', { error: 'Internal error. Try later.' });
                }
            }

        });

        //return an existing user
        socket.on('existingUser', async () => {
            if (!validateUser(socket.user)) return;

            try {
                const u = await userModel.GetUserById(socket.user.userid, "clientSalt serverSalt _id userName funds nonce");

                if (u) {
                    socket.emit('existingUser', {
                        userid: u._id,
                        userName: u.userName,
                        clientSalt: u.clientSalt,
                        funds: u.funds,
                        nonce: u.nonce,
                        hashedServerSalt: crypto.createHash('sha512').update(u.serverSalt).digest('hex')
                    });
                }
                else {
                    socket.emit('existingUser', { clientSalt: '', error: 'session expired' });
                }
            }
            catch (err) {
                logger.error(err);
                socket.emit('existingUser', { clientSalt: '', error: err });
            }
        });

        //update client salt
        socket.on('clientSalt', async (clientSalt) => {
            if (!validateUser(socket.user)) return;
            try {
                const oldSalt = await userModel.SaveClientSalt(socket.user.userid, clientSalt);

                socket.emit('clientSalt', oldSalt);
            }
            catch (err) {
                socket.emit('clientSalt', err);
            }
        });

        //get new bitcion address
        socket.on('newCoinAddr', async (coinName) => {
            if (!validateUser(socket.user)) return;
            try {
                const addr = await userModel.GetNewAddress(socket.user.userid, coinName);
                socket.emit('newCoinAddr', addr);
            }
            catch (err) {
                logger.error(err);
                socket.emit('newCoinAddr', err);
            }
        });

        //get user balance
        socket.on('getBalance', async (coinName) => {
            if (!validateUser(socket.user)) return;
            try {
                const balance = await userModel.GetBalance(socket.user.userid, coinName);
                socket.emit('getBalance', balance);
            }
            catch (err) {
                logger.info(err);
                socket.emit('loggedUser', { error: 'Internal error. Try later.' });
            }
        });

        //get user balance
        socket.on('loginUser', async (u) => {
            try {
                const user = await userModel.LoginUser(u.userName, u.password);

                if (!user) {
                    socket.emit('loggedUser', { error: 'Wrong user name and password combination.' });
                    return;
                }
                const loggedUser = {
                    userid: user._id,
                    userName: user.userName,
                    clientSalt: user.clientSalt,
                    funds: user.funds,
                    nonce: user.nonce,
                    hashedServerSalt: crypto.createHash('sha512').update(user.serverSalt).digest('hex')
                };
                socket.user = { userid: loggedUser.userid, userName: loggedUser.userName };
                socket.emit('loggedUser', loggedUser);
            }
            catch (err) {
                logger.info(err);
                socket.emit('loggedUser', { error: 'Internal error. Try later.' });
            }
        });
    });
};
