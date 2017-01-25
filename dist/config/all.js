'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
var pkg = require(rootPath + '/package.json');

exports.default = {
    root: rootPath,
    serverRoot: rootPath + '/dist/app',
    clientRoot: rootPath + '/wwwroot',
    cookieSecret: 'node_DICE',
    port: process.env.PORT || 3000,
    app: {
        name: process.env.NODE_ENV === 'production' ? pkg.name + ' (' + pkg.version + ')' : pkg.name + ' [' + pkg.version + ']',
        version: pkg.version,
        description: pkg.description
    },
    mail: {
        enable: true,
        transport: 'SMTP',
        fromaddress: '',
        options: {
            host: "smtp.gmail.com",
            port: 465,
            secureConnection: true,
            requiresAuth: true,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        }
    },
    session: {
        timeout: 30 * 24 * 60 * 60 * 1000
    },
    support: '',
    projectName: '',
    copyrightName: ''
};
//# sourceMappingURL=all.js.map