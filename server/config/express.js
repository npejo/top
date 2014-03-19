'use strict';

/**
 * Module dependencies.
 */

var express = require('express'),
  mongoStore = require('connect-mongo')(express),
  flash = require('connect-flash'),
  winston = require('winston'),
  pkg = require('../package.json'),
  protectJSON = require('../helpers/protectJSON');

var env = process.env.NODE_ENV || 'development';

module.exports = function (app, config, passport, db) {

    app.set('showStackError', true);

    // should be placed before express.static
    app.use(express.compress({
            filter: function (req, res) {
                return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
            },
            level: 9
        })
    );

    app.use(express.favicon());
    app.use(express.static(config.root + '/public'));

    app.use(protectJSON);

    // Logging
    // Use winston on production
    var log;
    if (env !== 'development') {
        log = {
            stream: {
                write: function (message) {
                    winston.info(message);
                }
            }
        };
    } else {
        log = 'dev';
    }
    // Don't log during tests
    if (env !== 'test') app.use(express.logger(log));

    // set views path, template engine and default layout
    //  app.set('views', config.root + '/app/views')
    app.set('view engine', 'jade');

    app.configure(function () {
        // expose package.json to views
        app.use(function (req, res, next) {
            res.locals.pkg = pkg;
            res.locals.appName = config.app.name;
            next();
        });

        // cookieParser should be above session
        app.use(express.cookieParser());

        // Request body parsing middleware should be above methodOverride
        app.use(express.urlencoded());
        app.use(express.json());
        app.use(express.methodOverride());

        // express/mongo session storage
        app.use(express.session({
                secret: config.sessionSecret,
                store: new mongoStore({
                    db: db.connection.db,
                    collection : config.sessionCollection
                })
            }
        ));

        // use passport session
        app.use(passport.initialize());
        app.use(passport.session());



        // connect flash for flash messages - should be declared after sessions
        app.use(flash());

        // should be declared after session and flash
        //    app.use(helpers(pkg.name))

        // adds CSRF support
        if (process.env.NODE_ENV !== 'test') {
            app.use(express.csrf());

            // This could be moved to view-helpers :-)
            app.use(function(req, res, next){
                res.locals.csrf_token = req.csrfToken(); // TODO: use HEADERS instead of locals
                next();
            });
        }

        // routes should be at the last
        app.use(app.router);

        // assume "not found" in the error msgs
        // is a 404. this is somewhat silly, but
        // valid, you can do whatever you like, set
        // properties, use instanceof etc.
        app.use(function(err, req, res, next) {
            // treat as 404
            if (err.message &&
                (~err.message.indexOf('not found') ||
                (~err.message.indexOf('Cast to ObjectId failed')))) {

                return next(err);
            }

            // log it
            // send emails if you want
            console.error(err.stack);

            // error page
            res.json('500', { error: err.stack });
        });

        // assume 404 since no middleware responded
        app.use(function(err, req, res) {
            res.json('404', {
                url: req.originalUrl,
                error: err.message
            });
        });
    });

    // development env config
    app.configure('development', function () {
        app.locals.pretty = true;
    });
};