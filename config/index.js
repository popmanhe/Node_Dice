/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Ken on 2/08/2014
 */

'use strict';


var _ = require('lodash');


// default is development environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load app configuration
module.exports = _.extend(
    require(__dirname + '/all.js'),
    require(__dirname + '/' + process.env.NODE_ENV + '.js') || {});
