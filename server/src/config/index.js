

import _  from'lodash';


// default is development environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load app configuration
export default _.extend(
    require(__dirname + '/all.js'),
    require(__dirname + '/' + process.env.NODE_ENV + '.js') || {});
