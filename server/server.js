'use strict';
/**
 * Main application entry file.
 */

// Module dependencies.
var express = require('express'),
    router = express.Router(),
    debug = require('debug')('top'),
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

// Bootstrap routes
require('./config/routes')(router, config, passport);

// Express settings
require('./config/express')(app, router, config, passport, dbConn);



// Start the app by listening on <port>
app.set('port', config.port || process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});

// Expose app
module.exports = app;