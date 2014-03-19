'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * User Schema
 */

var HashTagSchema = new Schema({
    tag: { type: String, default: ''},
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: 'Please specify owner user of the hash tag'},
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: 'Please specify project for the hash tag'},
    nbrUsages: {type: Number, default: 0},
    createdAt: Date,
    updatedAt: Date

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

HashTagSchema.methods = {};

mongoose.model('HashTag', HashTagSchema);