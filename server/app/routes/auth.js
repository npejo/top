'use strict';

var auth = require('../controllers/auth');

/**
 * Routes for handling user session
 * There are no restrictions for accessing these
 *
 * @param app
 * @param config
 * @param passport
 */
module.exports = function (app, config, passport) {

    /**
     * GET /session - boolean, check if the user is logged in
     */
    app.get('/session', auth.getUserSession);

    /**
     * POST /signin - login user using local strategy
     */
    app.post('/signin', passport.authenticate('local', {
        failureFlash: 'Invalid email or password.'
    }), auth.getUserSession);

    /**
     * DELETE /signout - logout user
     */
    app.del('/signout', auth.destroyUserSession);
};