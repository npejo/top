'use strict';

/**
 * Controllers
 */

var projects = require('../controllers/projects');
var auth = require('../middlewares/authentication');

/**
 * Route middlewares
 */

/**
 * Expose routes
 */

module.exports = function (router) {
    /**
     * Fetch project document when there is projectId
     */
    router.param('projectId', projects.getProjectByIdMdlWare);

    /**
     * GET /projects - get list of all projects. Route available only for admin users
     */
    router.get('/projects', auth.requireAdmin, projects.getProjects);

    /**
     * GET /projects/123456 - get specific project by id
     */
    router.get('/projects/:projectId', auth.requireLogin, projects.getProjectById);

    /**
     * POST /projects - create new project
     */
    router.post('/projects', auth.requireLogin, projects.createProject);

    /**
     * PUT /projects/123456 - update specific project details
     * TODO: Only the owner can update details about specific project
     */
    router.put('/projects/:projectId', auth.requireLogin, projects.updateProject);

    /**
     * DELETE / projects/123456 - delete project.
     * TODO: Only the owner can delete specific project
     */
    router.delete('/projects/:projectId', auth.requireLogin, projects.deleteProject);
};
