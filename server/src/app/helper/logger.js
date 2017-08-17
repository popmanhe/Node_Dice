import path from 'path';
import config from '../../config';
import winston from 'winston';
winston.transports.DailyRotateFile = require('winston-daily-rotate-file');

export default new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            level: 'debug',
            colorize: true
        })
        , new (winston.transports.DailyRotateFile)({
            level: 'silly',
            filename: path.join(config.serverRoot, '/logs/access-'),
            datePattern: 'yyyy-MM-dd.log',
            maxsize: 5242880 /* 5MB */
        }),
        new (winston.transports.MongoDB, {
            db: config.mongodb.hostaddress + '/' + config.mongodb.dbname
            , storeHost: true
        })
    ]
});
