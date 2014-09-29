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

module.exports = function (router) {
    router.param('hashtagId', hashTags.getHashTagByIdMdlWare);

    router.get('/hashtags', hashTags.getHashTags);
    router.get('/hashtags/:hashtagId', hashTags.getHashTagById);
    router.post('/hashtags', hashTags.createHashTag);
    router.put('/hashtags/:hashtagId', hashTags.updateHashTag);
    router.delete('/hashtags/:hashtagId', hashTags.deleteHashTag);
};
