'use strict';

var mongoose = require('mongoose'),
    Project = mongoose.model('Project');

exports.getProjectByIdMdlWare = function(req, res, next, projectId) {
    Project.findOne({ _id : projectId}, function (err, project) {
        if (err) return next(err);
        if (!project) return next(new Error('Project with id: ' + req.params.projectId + ' not found'));
        req.currentProject = project;
        next();
    });
};

exports.getProjectById = function(req, res) {
    res.json(req.currentProject);
};

exports.getProjects = function(req, res, next) {
    Project.find().exec(function(err, projects) {
        if (err) {
            return next(err);
        }
        res.json(projects);
    });
};

exports.createProject = function(req, res, next) {
    var project = new Project(req.body);

    var now = new Date();
    project.owner = req.user.id;
    project.createdAt = now;
    project.updatedAt = now;

    project.save(function(err, project) {
        if (err) {
            return next(err);
        }
        res.json(201, project);
    });
};

exports.updateProject = function(req, res, next) {
    var now = new Date();
    req.body.updatedAt = now;

    req.currentProject.update(req.body)
        .exec(function(err) {
        if (err) {
            return next(err);
        }
        res.json(200, true);
    });
};

exports.deleteProject = function(req, res, next) {
    req.currentProject.remove(function(err) {
        if (err) {
            return next(err);
        }
        res.json(200, true);
    });
};