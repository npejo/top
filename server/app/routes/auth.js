'use strict';

var auth = require('../controllers/auth');

/**
 * Routes for handling user session
 * There are no restrictions for accessing these
 *
 * @param router
 * @param config
 * @param passport
 */
module.exports = function (router, config, passport) {

    /**
     * GET /session - boolean, check if the user is logged in
     */
    router.get('/session', auth.getUserSession);

    /**
     * POST /signin - login user using local strategy
     */
    router.post('/signin', passport.authenticate('local', {
        failureFlash: 'Invalid email or password.'
    }), auth.getUserSession);

    /**
     * DELETE /signout - logout user
     */
    router.delete('/signout', auth.destroyUserSession);
};