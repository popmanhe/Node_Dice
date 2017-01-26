/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Ken on 8/08/2014
 */

'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_winston2.default.transports.DailyRotateFile = require('winston-daily-rotate-file');

module.exports = new _winston2.default.Logger({
    transports: [new _winston2.default.transports.Console({
        level: 'debug',
        colorize: true
    }), new _winston2.default.transports.DailyRotateFile({
        level: 'silly',
        filename: _path2.default.join(__dirname, '../../logs/access-'),
        datePattern: 'yyyy-MM-dd.log',
        maxsize: 5242880 /* 5MB */
    })]
});
//# sourceMappingURL=logger.js.map