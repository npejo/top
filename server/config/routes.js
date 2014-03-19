'use strict';

var path = require('path'),
    fileHelper = require('../helpers/file'),
    routes = {};

fileHelper.loadDirModules(path.resolve('app/routes'), [], routes);

module.exports = function(app, config, passport) {
    var handler = null;

    for (handler in routes) {
        routes[handler](app, config, passport);
    }

    // set default route
    app.get('*', function(req, res) {
        res.sendfile(config.root + '/client/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};