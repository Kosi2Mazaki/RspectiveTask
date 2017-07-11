'use strict';
var mongoose = require('mongoose');
var Task = require('./task');

/**
 * Used to handle server error. The message will be logged into the
 * console and than the 500 error will be returned as the response
 * @param {string} message - message to be passed to the application
 * @param {object} err - error received from the server
 */
function handleError(message, err) {
    console.log(message + ": " + err);
    //res.status(500).send(message + ".");
}

/**
 * Function used to get all tasks from the database
 * @param  {object} req request passed to the controller
 * @param  {object} res response send by the server
 */
exports.list_all_tasks = function (req, res) {
    Task.find({}, function (err, tasks) {
        if (err) {
            handleError("Some Internal error while listing tasks occurred", err);
        } else {
            console.log(tasks);
            res.send(tasks);
        }
    });
};

/**
 * Function used to get task from the database by its id
 * @param  {object} req request passed to the controller
 * @param  {object} res response send by the server
 */
exports.get_task = function (req, res) {
    Task.findById(req.params.id).
        populate('subtasks')
        .exec(function (err, task) {
            if (err) {
                handleError("Some Internal error while fetching a single task occurred", err);
            } else {
                res.send(task);
            }
        });
};
/**
 * Used to create single task without any subtasks - bes
 * @param  {object} req request passed to the controller
 * @param  {object} res response send by the server
 */
exports.create_task = function (req, res) {
    console.log(req.body);
    var newTask = new Task(req.body);

    newTask.save(function (err) {
        if (err) {
            handleError("Some Internal error while creating tasks occurred", err);
        } else {
            res.send(newTask);
        }
    });
};
/**
 * Used to create a subtask element. As the response, the updated
 * task is returned
 * @param  {object} req request passed to the controller
 * @param  {object} res response send by the server
 */
exports.create_subtask = function (req, res) {
    Task.findById(req.params.id, function (err, parent) {
        if (err) {
            handleError("Some Internal error while creating a sub-tasks occurred", err);
        }

        var newTask = new Task(req.body);
        newTask.save(function (err) {
            if (err) {
                handleError("Some Internal error while creating tasks occurred", err);
            }
        });
        parent.subtasks.push(newTask);
        parent.save(function (err, updatedTask) {
            if (err) {
                handleError("Some Internal error while creating tasks occurred", err);
            } else {
                res.send(newTask);
            }
        });
    });
};

/**
 * Used to remove a root task from the database
 * @param  {object} req request passed to the controller
 * @param  {object} res response send by the server
 */
exports.remove_task = function (req, res) {
    Task.findByIdAndRemove(req.params.id, function (err, element) {
        if (err) {
            handleError("Some Internal error while removing a task occurred", err);
        }
    });

    // Update references
    Task.update(
        {},
        { $pull: { subtasks: req.params.id } },
        { multi: true },
        function (err) {
            if (err) {
                handleError("Some Internal error while removing a reference to the task occurred", err);
            }

        }
    );
    res.send("Done!");
};