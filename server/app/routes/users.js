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

module.exports = function (router) {
    router.param('userId', users.getUserByIdMdlWare);

    // users routes
    router.get('/users', users.getUsers);
    router.get('/users/:userId', users.getUserById);

    router.post('/users', users.createUser);
    router.put('/users/:userId', users.updateUser);
    router.delete('/users/:userId', users.deleteUser);
};