'use strict';

/**
 * Module dependencies.
 */

var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    csrf = require('csurf'),
    mongoStore = require('connect-mongo')(session),
    flash = require('connect-flash'),
    pkg = require('../package.json'),
    protectJSON = require('../helpers/protectJSON');

var env = process.env.NODE_ENV || 'development';

module.exports = function (app, router, config, passport, db) {

    // should be placed before express.static
    //app.use(compression());

    // view engine setup
    app.set('views', config.root + '/server/views');
    app.set('view engine', 'jade');

//    app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(config.clientPublic));

    app.use(protectJSON);

    // Logging
    // Use winston on production
//    var log;
//    if (env !== 'development') {
//        log = {
//            stream: {
//                write: function (message) {
//                    winston.info(message);
//                }
//            }
//        };
//    } else {
//        log = 'dev';
//    }
//    // Don't log during tests
//    if (env !== 'test') app.use(logger(log));

    // express/mongo session storage
    app.use(session({
            secret: config.sessionSecret,
            store: new mongoStore({
                db: db.connection.db,
                collection : config.sessionCollection
            }),
            resave: false,
            saveUninitialized: false
        }
    ));

    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());



    // connect flash for flash messages - should be declared after sessions
    app.use(flash());

    // adds CSRF support
//    if (process.env.NODE_ENV !== 'test') {
//        app.use(csrf());
//
//        app.use(function(req, res, next){
//            res.locals.csrf_token = req.csrfToken(); // TODO: use HEADERS instead of locals
//            next();
//        });
//    }

    // routes should be at the last
    app.use('/', router);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

//    app.use(function (err, req, res, next) {
//        if (err.code !== 'EBADCSRFTOKEN') return next(err)
//
//        // handle CSRF token errors here
//        res.status(403);
//        res.send('session has expired or form tampered with');
//    });

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
};
