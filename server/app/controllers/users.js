'use strict';
var mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.getUserByIdMdlWare = function(req, res, next, userId) {
    User.findOne({ _id : userId}, function (err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('User with id: ' + req.params.userId + ' not found'));
        req.currentUser = user;
        next();
    });
};

exports.getUserById = function(req, res) {
    res.json(req.currentUser);
};

exports.getUsers = function(req, res) {
    User.find(function(err, users) {
        if (err) {
            return res.json(500, {error: err});
        }
        res.json(200, users);
    });
};

exports.createUser = function(req, res) {
    var user = new User(req.body);
    user.provider = 'local';

    user.save(function (err) {
        if (err) {
            return res.send(400, {
                error: err.errors
            });
        }

        // manually login the user once successfully signed up
        req.logIn(user, function(err, next) {
            if (err) return next(err);
            return res.json(201, {user: user});
        });
    });
};

exports.updateUser = function(req, res, next) {
    req.currentUser.update(req.body)
        .exec(function(err) {
            if (err) {
                return next(err);
            }
            res.json(200, true);
        });
};

exports.deleteUser = function(req, res, next) {
    req.currentUser.remove(function(err) {
        if (err) {
            return next(err);
        }
        res.json(200, true);
    });
};