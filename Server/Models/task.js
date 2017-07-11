'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a task schema
var taskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    created_at: Date,
    updated_at: {
        type: Date,
        default: Date.now
    },
    subtasks: [this]
});

/**
 * Used to update modification date and creation date
 * before pushing to the database. This will be called
 * for each request
 * @param  {} 'save'
 * @param  {} function(next) will pass the flow further
 */
taskSchema.pre('save', function (next) {
    var curDate = new Date();
    this.updated_at = curDate;
    // if created not set - set it right now
    if (!this.created_at) {
        this.created_at = curDate;
    }

    next();
});

// Create a model based on the schema
var Task = mongoose.model('Task', taskSchema);


// Exports a model
module.exports = Task;