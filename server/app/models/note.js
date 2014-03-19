'use strict';

/**
* Module dependencies.
*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

///**
// * NotePeriod Schema - embedded object in the Note Schema
// */
//var NotePeriodSchema = new Schema({
//
//});
//
//NotePeriodSchema.methods = {};
//mongoose.model('NotePeriod', NotePeriodSchema);

/**
* Note Schema
*/

var NoteSchema = new Schema({
    title: { type: String, default: ''},
    body: { type: String, default: '', required: 'The body of the note can not be blank'},
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: 'Please specify owner user of the note'},
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true},
    hashTags: [{type: Schema.Types.ObjectId, ref:'HashTag'}],
    duration: {type: Number, default: 0},
    pause: {type: Number, default: 0},
    periods: [{
        start: Date,
        end: Date,
        pauses:[{
            start: Date,
            end: Date
        }],
        tzoffset: {type: Number, default: 0}
    }],
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

NoteSchema.methods = {};

mongoose.model('Note', NoteSchema);
