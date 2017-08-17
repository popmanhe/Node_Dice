import config from '../../config';
import logger from '../helper/logger';

export default (io) => {
    //Add all events that need user to be authenticated
    const authEvents = [
        //user profile
        'SAVE_CLIENTSALT', 'NEW_COINADDR', 'REFRESH_BALANCE',
        //chat
        'SEND_MESSAGE',
        //dice
        'ROLL', 'GET_MYBETS'
    ];

    const adminEvents = [];
    logger.info("Web socket is enabled for following domain1(s): " + config.origins);
    io.origins(config.origins);

    io.on('connection', (socket) => {
        //authenticate users for specified events
        socket.use(function (packet, next) {
            if (authEvents.indexOf(packet[0]) > -1 && (!socket.user || !socket.user.userid)) {
                socket.emit('action', { type: 'ERROR', message: 'User Not Logged in.' });
                return;
            }
            next();
        });

        socket.use(function (packet, next) {
            if (adminEvents.indexOf(packet[0]) > -1 && (!socket.user || !socket.user.userid || !socket.user.userType != 1)) {
                socket.emit('action', { type: 'ERROR', message: 'Invalid user.' });
                return;
            }
            next();
        });

        //throttle control
        socket.use(function (packet, next) {

            next();
        });

    });
};