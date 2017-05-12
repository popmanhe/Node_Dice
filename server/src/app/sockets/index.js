import middleware from './middleware';
import auth from './auth';
import common from './common';
import dice from './dice';
import chat from './chat';

export default (io) => {
    middleware(io);
    auth(io);
    common(io);
    dice(io);
    chat(io);
};