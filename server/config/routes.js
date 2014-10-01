'use strict';

var path = require('path'),
    fileHelper = require('../helpers/file'),
    routes = {};

fileHelper.loadDirModules(path.resolve('app/routes'), [], routes);

module.exports = function(router, config, passport) {
    var handler = null;

    for (handler in routes) {
        routes[handler](router, config, passport);
    }

    // set default route
    router.get('/', function(req, res) {
        res.sendFile(config.root + '/client/dist/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};