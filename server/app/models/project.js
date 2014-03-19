'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * User Schema
 */

var ProjectSchema = new Schema({
    name: { type: String, default: ''},
    description: { type: String, default: ''},
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: 'Please specify owner user of the hash tag'},
    createdAt: Date,
    totalTime: {type: Number, default: 0},
    totalPause: {type: Number, default: 0}

});

/**
 * Validations
 */


/**
 * Pre-save hook
 */


/**
 * Methods
 */

ProjectSchema.methods = {};

mongoose.model('Project', ProjectSchema);