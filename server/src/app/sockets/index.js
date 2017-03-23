import common from './s_common';
import overunder from './s_overunder';
import chat from './s_chat.js';
import logger from '../helper/logger';
import cookie from 'cookieparser';

export default (io) => {
    // io.use((socket, next) => {
    //     if (socket.request.headers.cookie) {
    //         const c = cookie.parse(socket.request.headers.cookie);
    //         logger.info(c['connect.sid']);
    //         socket.session = { userid: 'neo' };
    //     }
    //     return next();
    // });

    common(io);
    overunder(io);
    chat(io);
};