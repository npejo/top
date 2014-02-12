'use strict';
/**
 * Main application entry file.
 */
console.log('MU VLEZE!');
// Module dependencies.
var express = require('express'),
    passport = require('passport');


// load helpers
var fileHelper = require('./helpers/file');

// Load configurations
// Set the node environment variable if not set before
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Initializing system variables 
var config = require('./config/app');

// Bootstrap db connection
var dbConn = require('./config/db')(config);
// Bootstrap models
fileHelper.loadDirModules(__dirname + '/app/models');

// Bootstrap passport config
require('./config/passport')(passport, config);

var app = express();

// Express settings
require('./config/express')(app, config, passport, dbConn);

// Bootstrap routes
require('./config/routes')(app, config, passport);


// Start the app by listening on <port>
var port = process.env.PORT || config.port;
app.listen(port);
console.log('Express app started on port ' + port);

// Expose app
module.exports = app;