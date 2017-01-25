'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// default is development environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load app configuration
module.exports = _lodash2.default.extend(require(__dirname + '/all.js'), require(__dirname + '/' + process.env.NODE_ENV + '.js') || {});
//# sourceMappingURL=index.js.map