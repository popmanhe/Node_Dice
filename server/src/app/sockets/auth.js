import config from '../../config';
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
    });
};