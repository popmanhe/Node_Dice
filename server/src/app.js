/**
 * Copyright 2017 Node Dice
 *
 * Created by Neo on 2017/02/08
 */

//import newrelic from 'newrelic';
//import cluster from 'cluster');
import config from './config';
import express from 'express';
import expressValidator from 'express-validator';
//favicon from 'serve-favicon'),
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoConnect from 'connect-mongo';
import socketHandshake from 'socket.io-handshake';
import http from 'http';
import socketio from 'socket.io';
import routes from './app/routes';
import sockets from './app/sockets/';
import cors from 'cors';

const app = express();
const MongoStore = MongoConnect(session);
//if (process.env.SITE_USER) {
//    app.use(express.basicAuth(process.env.SITE_USER, process.env.SITE_PASS));
//}

/*set up session for express*/
const sessionStore = new MongoStore(config.mongoStore);
app.use(cookieParser(config.cookieSecret));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.cookieSecret,
    store: sessionStore,
    cookie: {
      maxAge: config.session.timeout //session will expire in 30 days
    }
}));
app.use(cors());
/*require socket.io*/
const server = http.createServer(app);
const io = socketio(server,{
    allowRequest: function(handshake, cb) {
                return cb(null, true); // authorize every connections 
            }
});
// const fn_origins = (err, success) =>{
//     if (err) 
//     {
//         console.log(err);
//         return;
//     }
//     console.log(success);
// };
// io.origins((origins, fn_origins) => {console.log('origins:' + origins); fn_origins(null, true);});
/*Adding session to socket*/
io.use(socketHandshake({
    store: sessionStore, 
    key: 'connect.sid', 
    secret: config.cookieSecret, 
    parser: cookieParser()
}));

//config express in all environments
app.disable('x-powered-by');


//Add express's middlewares
//app.use(favicon(config.clientRoot + '/favicon.ico'));
//Only used in development. In production, use nginx to serve static files
if (process.env.NODE_ENV == 'development') {
    app.use(express.static(config.clientRoot));
    app.use(compression({ threshold: 512 }));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator([]));

//map routes for pages
routes(app);
//socket communication for games
sockets(io);

server.listen(config.port, function () {
    console.log('Server running on port ' + config.port);
});


