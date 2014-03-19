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

module.exports = function (app) {
    /**
     * Fetch project document when there is projectId
     */
    app.param('projectId', projects.getProjectByIdMdlWare);

    /**
     * GET /projects - get list of all projects. Route available only for admin users
     */
    app.get('/projects', auth.requireAdmin, projects.getProjects);

    /**
     * GET /projects/123456 - get specific project by id
     */
    app.get('/projects/:projectId', auth.requireLogin, projects.getProjectById);

    /**
     * POST /projects - create new project
     */
    app.post('/projects', auth.requireLogin, projects.createProject);

    /**
     * PUT /projects/123456 - update specific project details
     * TODO: Only the owner can update details about specific project
     */
    app.put('/projects/:projectId', auth.requireLogin, projects.updateProject);

    /**
     * DELETE / projects/123456 - delete project.
     * TODO: Only the owner can delete specific project
     */
    app.del('/projects/:projectId', auth.requireLogin, projects.deleteProject);
};
