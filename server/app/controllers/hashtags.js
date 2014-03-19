'use strict';

var mongoose = require('mongoose'),
    HashTag = mongoose.model('HashTag');

exports.getHashTagByIdMdlWare = function(req, res, next, hashtagId) {
    HashTag.findOne({ _id : hashtagId}, function (err, note) {
        if (err) return next(err);
        if (!note) return next(new Error('HashTag with id: ' + req.params.noteId + ' not found'));
        req.currentHashTag = note;
        next();
    });
};

exports.getHashTagById = function(req, res) {
    res.json(req.currentHashTag);
};

exports.getHashTags = function(req, res, next) {
    HashTag.find().exec(function(err, hashTags) {
        if (err) {
            return next(err);
        }
        res.json(hashTags);
    });
};

exports.createHashTag = function(req, res, next) {
    var hashTag = new HashTag(req.body);

    var now = new Date();
    hashTag.owner = req.user.id;
    hashTag.createdAt = now;
    hashTag.lastUsedAt = now;

    hashTag.save(function(err, hashTag) {
        if (err) {
            return next(err);
        }
        res.json(201, hashTag);
    });
};

exports.updateHashTag = function(req, res, next) {
    var now = new Date();
    req.body.lastUsedAt = now;
    req.currentHashTag.update(req.body)
        .exec(function(err) {
        if (err) {
            return next(err);
        }
        res.json(200, true);
    });
};

exports.deleteHashTag = function(req, res, next) {
    req.currentHashTag.remove(function(err) {
        if (err) {
            return next(err);
        }
        res.json(200, true);
    });
};