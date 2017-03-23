import common from './s_common';
import overunder from './s_overunder';
import chat from './s_chat.js';
import logger from '../helper/logger';
import uuid from 'uuid';

const assignSessionID = (socket, next) =>{
       socket.handshake.headers.cookie = 'dSession=sgasdgasdg;path=/;httpOnely'
        return next(new Error('error...'));
};

export default (io) => {

    io.use(assignSessionID);

    common(io);
    overunder(io);
    chat(io);
};