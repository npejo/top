'use strict';

var fs = require('fs');
var loadDirModules = function (path, exclude, resultObj) {
    var excluded = exclude || [];

    fs.readdirSync(path).forEach(function (file) {
        var newPath = path + '/' + file;

        var stat = fs.statSync(newPath);

        // check if current path should be excluded
        if (excluded.indexOf(file) === -1) {
            if (stat.isFile()) {
                // if current path is file, load the module.
                // Append it to the resultObj if this parameter exists
                if (/(.*)\.(js$|coffee$)/.test(file)) {
                    if (typeof resultObj === 'object') {
                        resultObj[newPath] = require(newPath);
                    } else {
                        require(newPath);
                    }
                }
            } else if (stat.isDirectory()) {
                // if current path is directory, load its content
                loadDirModules(newPath);
            }
        }
    });
};

exports.loadDirModules = loadDirModules;