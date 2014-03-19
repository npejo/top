'use strict';

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

module.exports = function (app) {

    app.param('noteId', notes.getNoteByIdMdlWare);

    // notes routes
    app.get('/notes', notes.getNotes);
    app.post('/notes', notes.createNote);

    app.get('/notes/:noteId', notes.getNoteById);
    app.del('/notes/:noteId', notes.deleteNote);
    app.put('/notes/:noteId', notes.updateNote);

    app.post('/notes/:noteId/periods', notes.startTracking); // start tracking time for the note
    app.put('/notes/:noteId/periods/:periodId', notes.stopTracking); // stop tracking time for the note
    app.del('/notes/:noteId/periods/:periodId', notes.deleteTrackedPeriod); // remove tracked period

    app.post('/notes/:noteId/periods/:periodId/pauses', notes.startPause); // start new pause for the note
    app.put('/notes/:noteId/periods/:periodId/pauses/:pauseId', notes.endPause); // stop pause for the note
    app.del('/notes/:noteId/periods/:periodId/pauses/:pauseI', notes.deleteNotePause); // remove tracked period

//    app.get('/notes/search', notes.deleteNotePeriod);
};

//GET /notes?offset=X&limit=XsortBy=createdAt:desc
//GET /notes/search?from=X&to=X&q=XXX
