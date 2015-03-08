'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var EntrySchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    project:{
       type:String,
        required: 'Project Cannot Be Blank'
    },
    startDate: {
        type: Date,
        required: 'StartDate Cannot Be Blank'
    },
    endDate: {
        type: Date,
        required: 'EndDate Cannot Be Blank'
    },
    monday: {
        type: Number,
        default: 0,
        trim: true
    },
    tuesday: {
        type: Number,
        default: 0,
        trim: true
    },
    wednesday: {
        type: Number,
        default: 0,
        trim: true
    },
    thursday: {
        type: Number,
        default: 0,
        trim: true
    },
    friday: {
        type: Number,
        default: 0,
        trim: true
    },
    saturday: {
        type: Number,
        default: 0,
        trim: true
    },
    sunday: {
        type: Number,
        default: 0,
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Entry', EntrySchema);
