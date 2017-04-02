import common from './s_common';
import overunder from './s_overunder';
import chat from './s_chat.js';
import config from '../../config';

// import logger from '../helper/logger';
// import uuid from 'uuid';
// import socketSession from './handshake.js';

// const assignSessionID = (socket, next) =>{
//          logger.info('foo='+socket.handshake.query.foo);
//         return next();
// };

export default (io) => {
    
    io.origins(config.origins);
    // io.use(socketSession());

    common(io);
    overunder(io);
    chat(io);
};