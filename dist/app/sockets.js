'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _s_common = require('./sockets/s_common');

var _s_common2 = _interopRequireDefault(_s_common);

var _s_overunder = require('./sockets/s_overunder');

var _s_overunder2 = _interopRequireDefault(_s_overunder);

var _s_chat = require('./sockets/s_chat.js');

var _s_chat2 = _interopRequireDefault(_s_chat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (io, sessionOptions) {
    (0, _s_common2.default)(io);
    (0, _s_overunder2.default)(io);
    (0, _s_chat2.default)(io);
};
//# sourceMappingURL=sockets.js.map