import common from './s_common';
import overunder from './s_overunder';
import chat from './s_chat.js';

export default (io) => {
    common(io);
    overunder(io);
    chat(io);
};