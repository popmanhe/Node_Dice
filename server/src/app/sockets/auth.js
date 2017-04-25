import config from '../../config';
import userModel from '../Models/userModel';
import crypto from 'crypto';
import logger from '../helper/logger';
export default (io) => {
    //Add all events that need user to be authenticated
    const authEvents = [
        //user profile
        'existingUser', 'clientSalt', 'newCoinAddr', 'getBalance',
        //chat
        'sendChat',
        //dice
        'roll', 'getMyBets'
    ];
    logger.info("Web socket is enabled for following domain1(s): " + config.origins);
    io.origins(config.origins);
    io.on('connection', (socket) => {
        socket.use(function (packet, next) {
            if (authEvents.indexOf(packet[0]) > -1 && (!socket.user || !socket.user.userid)) {
                socket.emit('invalidUser');
                return;
            }
            next();
        });
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
                socket.user = { userid: loggedUser.userid, userName: loggedUser.userName };
                socket.emit('action', { type: 'LOGGED_USER', user: loggedUser });
            }
            catch (err) {
                logger.info(err);
                socket.emit('action', { type: 'ERROR', message: 'Internal error. Try later.' });
            }
        });
    });
};