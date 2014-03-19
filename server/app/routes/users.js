'use strict';

/**
 * Controllers
 */

var users = require('../controllers/users');

/**
 * Route middlewares
 */

/**
 * Expose routes
 */

module.exports = function (app) {
    app.param('userId', users.getUserByIdMdlWare);

    // users routes
    app.get('/users', users.getUsers);
    app.get('/users/:userId', users.getUserById);

    app.post('/users', users.createUser);
    app.put('/users/:userId', users.updateUser);
    app.del('/users/:userId', users.deleteUser);
};