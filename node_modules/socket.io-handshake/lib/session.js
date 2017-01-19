var debug = require('debug')('socket.io-handshake');
var util = require('util');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

module.exports = Session;

/**
 * The socket.io session object.  
 *
 * Calling this class will return a function that will call an instance
 * of this class's middlware function
 *
 * @param {Object} options
 */

function Session (options) {

  if (!(this instanceof Session)) {
    return new Session(options);
  }

  function session (socket, cb) {
    session.middleware(socket, cb);
  }

  session.__proto__ = Session.prototype;

  Session.init(session, options);

  return session;
}

/**
 * Initialize the Socket.IO Sessions instance
 *
 * @param {Session} session
 * @param {object} options
 * @return Session
 */

Session.init = function (session, options) {

  if (!(session instanceof Session)) return new Session(options);

  options = options || {};

  debug('options', options);

  session.parser = options.parser || cookieParser();
  session.store = options.store || new expressSession.MemoryStore();
  session.key = options.key || 'io';
  session.secret = options.secret || 'secret';

  return session;
};

/**
 * The middlware function socket.io will invoke
 *
 * @param {Socket} socket
 * @param {functin} fn
 */

Session.prototype.middleware = function (socket, cb) {
  var self = this;
  var handshake = socket.handshake || {};
  if (handshake.headers && handshake.headers.cookie) {
    debug('headers.cookie %s', handshake.headers.cookie);
    this.parser(handshake, {}, function (err) {
      handshake.sessionID = cookieParser.signedCookie(((handshake.cookies ? handshake.cookies[self.key] : '') || ''), self.secret);
      handshake.sessionStore = self.store;
      handshake.sessionStore.get(handshake.sessionID, function (err, data) {
        if (err) return cb(err);
        if (!data) return cb(new Error('Invalid Session'));
        handshake.session = new expressSession.Session(handshake, data);
        cb();
      });
    });
  }
  else {
    cb(new Error('Missing Cookies'));
  }
};

