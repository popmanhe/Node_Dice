
[![Build Status](https://travis-ci.org/turbonetix/socket.io-handshake.svg?branch=master)](https://travis-ci.org/turbonetix/socket.io-handshake)
[![NPM version](https://badge.fury.io/js/socket.io-handshake.svg)](http://badge.fury.io/js/socket.io-handshake)
[![David DM](https://david-dm.org/turbonetix/socket.io-handshake.png)](https://david-dm.org/turbonetix/socket.io-handshake.png)

Session middleware for [socket.io](https://github.com/Automattic/socket.io "socket.io") v1.x;

# Examples

```javascript
var socketSessions = require('socket.io-handshake');
var io = require('socket.io')(3000);
io.use( socketSessions() );
```

Using [connect-redis](https://www.npmjs.org/package/connect-redis "connect-redis") for our session store.

```javascript
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var sessionStore = new RedisStore();
var cookieParser = require('cookie-parser');
var socketHandshake = require('socket.io-handshake');

var io = require('socket.io')(3000);
io.use(socketHandshake({store: sessionStore, key:'sid', secret:'secret', parser:cookieParser()}));
```

To access the session data.

```javascript
io.on('connection' function (sock) {
  if (!sock.handshake.session.name) {
    sock.emit('get name');
  };
  sock.on('set nama', function (name) {
    sock.handhsake.session.name = name;
    sock.handshake.session.save();
  });
});
```

# Installation and Environment Setup

Install node.js (See download and install instructions here: http://nodejs.org/).

Clone this repository

    > git clone git@github.com:turbonetix/socket.io-handshake.git

cd into the directory and install the dependencies

    > cd socket.io-handshake
    > npm install && npm shrinkwrap --dev

# Running Tests

Install coffee-script

    > npm install coffee-script -g

Tests are run using grunt.  You must first globally install the grunt-cli with npm.

    > sudo npm install -g grunt-cli

## Unit Tests

To run the tests, just run grunt

    > grunt spec

## TODO
