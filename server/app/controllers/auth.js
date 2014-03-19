'use strict';

exports.getUserSession = function(req, res) {
    if (req.isAuthenticated()) {
        res.json(200, true);
    } else {
        res.json(401, false);
    }
};

exports.destroyUserSession = function(req, res) {
    req.logout();
    res.json(200, true);
};