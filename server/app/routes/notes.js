/**
 * Controllers
 */

var notes = require('../controllers/notes');

/**
 * Route middlewares
 */

/**
 * Expose routes
 */

module.exports = function (app, config, passport) {
    // notes routes
    app.get('/notes', notes.getNotesByUser);
}