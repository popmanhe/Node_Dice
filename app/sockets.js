var common = require('./sockets/s_common'),
    overunder = require('./sockets/s_overunder');
module.exports = function (io, sessionOptions) {
    common(io);
    overunder(io);
}