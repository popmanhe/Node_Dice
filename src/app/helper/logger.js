/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Ken on 8/08/2014
 */

'use strict';

import path from 'path';
import winston from 'winston';
winston.transports.DailyRotateFile = require('winston-daily-rotate-file');
 
module.exports = new (winston.Logger)({
    transports: [
        new(winston.transports.Console)({
            level: 'debug',
            colorize: true
        }),
        new(winston.transports.DailyRotateFile)({
            level: 'silly',
            filename: path.join(__dirname, '../../logs/access-'),
            datePattern: 'yyyy-MM-dd.log',
            maxsize: 5242880 /* 5MB */
        })
    ]
});
