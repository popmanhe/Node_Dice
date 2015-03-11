var common = require('./sockets/s_common'),
    overunder = require('./sockets/s_overunder'),
    chat = require('./sockets/s_chat.js');
module.exports = function (io, sessionOptions) {
    common(io);
    overunder(io);
    chat(io);
}