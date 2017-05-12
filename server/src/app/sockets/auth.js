import config from '../../config';
import userModel from '../Models/userModel';
import crypto from 'crypto';
import logger from '../helper/logger';
import jwt from 'jsonwebtoken';
export default (io) => {
   
    io.on('connection', (socket) => {
       
        socket.on('AUTHENTICATE', async ({ user }) => {
            try {
                let loggedUser = await userModel.LoginUser(user.userName, user.password);

                if (!loggedUser) {
                    socket.emit('action', { type: 'ERROR', message: 'Wrong user name and password combination.' });
                    return;
                }
                loggedUser = {
                    userid: loggedUser._id,
                    userName: loggedUser.userName,
                    clientSalt: loggedUser.clientSalt,
                    funds: loggedUser.funds,
                    nonce: loggedUser.nonce,
                    hashedServerSalt: crypto.createHash('sha512').update(loggedUser.serverSalt).digest('hex')
                };
                socket.user = { userid: loggedUser.userid, userName: loggedUser.userName, loginTime: (new Date()).toUTCString() };
                const token = jwt.sign(socket.user, config.jwtSecret, { algorithm: 'HS256', expiresIn: 60 });
                socket.emit('action', { socket: 'broadcast', type: 'LOGGED_USER', user: loggedUser, token });
            }
            catch (err) {
                logger.error(err);
                socket.emit('action', { type: 'ERROR', message: 'Internal error. Try later.' });
            }
        });


    });
};