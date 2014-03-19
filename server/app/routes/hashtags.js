'use strict';

/**
 * Controllers
 */

var hashTags = require('../controllers/hashtags');

/**
 * Route middlewares
 */

/**
 * Expose routes
 */

module.exports = function (app) {
    app.param('hashtagId', hashTags.getHashTagByIdMdlWare);

    app.get('/hashtags', hashTags.getHashTags);
    app.get('/hashtags/:hashtagId', hashTags.getHashTagById);
    app.post('/hashtags', hashTags.createHashTag);
    app.put('/hashtags/:hashtagId', hashTags.updateHashTag);
    app.del('/hashtags/:hashtagId', hashTags.deleteHashTag);
};
