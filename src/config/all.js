'use strict';


import path from 'path';
const rootPath = path.normalize(__dirname + '/../../');
import pkg from rootPath + '/package.json';

export default {
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
            port:465,
            secureConnection: true,
            requiresAuth: true,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        }
    },
    session:{
        timeout: 30*24*60*60*1000
    },
    support: '',
    projectName: '',
    copyrightName: ''
};
