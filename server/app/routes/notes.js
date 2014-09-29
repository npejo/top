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

module.exports = function (router) {

    router.param('noteId', notes.getNoteByIdMdlWare);

    // notes routes
    router.get('/notes', notes.getNotes);
    router.post('/notes', notes.createNote);

    router.get('/notes/:noteId', notes.getNoteById);
    router.delete('/notes/:noteId', notes.deleteNote);
    router.put('/notes/:noteId', notes.updateNote);

    router.post('/notes/:noteId/periods', notes.startTracking); // start tracking time for the note
    router.put('/notes/:noteId/periods/:periodId', notes.stopTracking); // stop tracking time for the note
    router.delete('/notes/:noteId/periods/:periodId', notes.deleteTrackedPeriod); // remove tracked period

    router.post('/notes/:noteId/periods/:periodId/pauses', notes.startPause); // start new pause for the note
    router.put('/notes/:noteId/periods/:periodId/pauses/:pauseId', notes.endPause); // stop pause for the note
    router.delete('/notes/:noteId/periods/:periodId/pauses/:pauseI', notes.deleteNotePause); // remove tracked period

//    router.get('/notes/search', notes.deleteNotePeriod);
};

//GET /notes?offset=X&limit=XsortBy=createdAt:desc
//GET /notes/search?from=X&to=X&q=XXX
