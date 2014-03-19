'use strict';
/*
 *  Generic require login routing middleware
 */

exports.requireLogin = function (req, res, next) {
    if (req.isAuthenticated()) return next();
    res.json(401, 'Unauthorized');
};

exports.requireAdmin = function (req, res, next) {
    if (req.isAuthenticated() && req.user.isAdmin === true) return next();
    res.json(403, 'Forbidden');
};