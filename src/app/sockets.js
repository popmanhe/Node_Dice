import common from './sockets/s_common';
import overunder from './sockets/s_overunder';
import chat from './sockets/s_chat.js';

module.exports =  (io, sessionOptions) => {
    common(io);
    overunder(io);
    chat(io);
}