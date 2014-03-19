'use strict';

var mongoose = require('mongoose'),
    Note = mongoose.model('Note');

exports.getNoteByIdMdlWare = function(req, res, next, noteId) {
    Note.findOne({ _id : noteId}, function (err, note) {
        if (err) return next(err);
        if (!note) return next(new Error('Note with id: ' + req.params.noteId + ' not found'));
        req.currentNote = note;
        next();
    });
};

exports.getNoteById = function(req, res) {
    res.json(req.currentNote);
};

exports.getNotes = function(req, res, next) {
    Note.find().exec(function(err, notes) {
        if (err) {
            return next(err);
        }
        res.json(notes);
    });
};

exports.createNote = function(req, res, next) {
    var note = new Note(req.body);
    var now = new Date();

    note.owner = req.user.id;
    note.createdAt = now;
    note.updatedAt = now;

    note.save(function(err, note) {
        if (err) {
            return next(err);
        }
        res.json(201, note);
    });
};

exports.updateNote = function(req, res, next) {
    var now = new Date();
    for(var p in req.body) {
        if (req.currentNote[p] !== undefined) {
            req.currentNote[p] = req.body[p];
        }
    }
    req.currentNote.updatedAt = now;

    req.currentNote.save(function(err) {
        if (err) {
            return next(err);
        }
        res.json(200, req.currentNote);
    });
};

exports.deleteNote = function(req, res, next) {
    req.currentNote.remove(function(err) {
        if (err) {
            return next(err);
        }
        res.json(200, true);
    });
};

exports.startTracking = function(req, res, next) {
    var now = new Date();
    var newPeriod = {
        start: now,
        end: now,
        tzoffset: req.body.tzoffset
    };

    req.currentNote.periods.push(newPeriod);
    req.currentNote.updatedAt = now;

    req.currentNote.save(function(err) {
        if (err) next(err);
        res.json(201, newPeriod);
    });
};

exports.stopTracking = function(req, res, next) {
    var now = new Date();

    req.currentNote.periods.id(req.params.periodId).end = now;
    req.currentNote.updatedAt = now;

    req.currentNote.save(function(err) {
        if (err) next(err);
        res.json(200, true);
    });
};

exports.deleteTrackedPeriod = function(req, res, next) {
    req.currentNote.periods.id(req.params.periodId).remove();
    req.currentNote.updatedAt = new Date();

    req.currentNote.save(function(err) {
        if (err) next(err);
        res.json(200, true);
    });
};

exports.startPause = function(req, res, next) {
    var now = new Date();
    var newPause = {
        start: now,
        end: now
    };
    req.currentNote.periods.pauses.push(newPause);
    req.currentNote.updatedAt = now;

    req.currentNote.save(function(err) {
        if (err) next(err);
        res.json(201, newPause);
    });
};

exports.endPause = function(req, res, next) {
    var now = new Date(),
        periodId = req.params.periodId,
        pauseId = req.params.pauseId;

    req.currentNote.periods.id(periodId).pauses.id(pauseId).end = now;
    req.currentNote.updatedAt = now;

    req.currentNote.save(function(err) {
        if (err) next(err);
        res.json(200, true);
    });
};

exports.deleteNotePause = function(req, res, next) {
    var now = new Date(),
        periodId = req.params.periodId,
        pauseId = req.params.pauseId;

    req.currentNote.periods.id(periodId).pauses.id(pauseId).remove();
    req.currentNote.updatedAt = now;

    req.currentNote.save(function(err) {
        if (err) next(err);
        res.json(200, true);
    });
};