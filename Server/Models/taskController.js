'use strict';
var mongoose = require('mongoose');
var Task = require('./task');

/**
 * Function used to get all tasks from the database
 * @param  {} req request passed to the controller
 * @param  {} res response send by the server
 */
exports.list_all_tasks = function (req, res) {
    Task.find({}, function (err, tasks) {
        if (err) {
            console.log("[ERROR] Error while listing tasks: " + err);
            res.status(500).send("Some Internal error while listing tasks occured!");
        } else {
            console.log(tasks);
            res.send(tasks);
        }
    });
};

/**
 * Function used to get task from the database by its id
 * @param  {} req request passed to the controller
 * @param  {} res response send by the server
 */
exports.get_task = function (req, res) {
    Task.findById(req.params.id, function (err, task) {
        if (err) {
            console.log("[ERROR] Error while fetching task: " + err);
            res.status(500).send("Some Internal error while fetching task occured!");
        } else {
            console.log(task);
            res.send(task);
        }
    })
};
/**
 * Used to create single task without any subtasks - bes
 * @param  {} req request passed to the controller
 * @param  {} res response send by the server
 */
exports.create_task = function (req, res) {
    var newTask = new Task(req.body);

    newTask.save(function (err) {
        if (err) {
            console.log("[ERROR] Error while creating tasks: " + err);
            res.status(500).send("Some Internal error while creating tasks occured!");
        }

        res.send(newTask);
    });
};
/**
 * Used to create a subtask element
 * @param  {} req request passed to the controller
 * @param  {} res response send by the server
 */
exports.create_subtask = function (req, res) {
    Task.findById(req.params.id, function (err, parent) {
        if (err) {
            console.log("[ERROR] Error while creating a sub-tasks: " + err);
            res.status(500).send("Some Internal error while creating a sub-tasks occured!");
        }
        var newTask = new Task(req.body);
        parent.subtasks.push(newTask);
        parent.save(function (err, upatedTask) {
            if (err) {
                console.log("[ERROR] Error while creating tasks: " + err);
                res.status(500).send("Some Internal error while creating tasks occured!");
            }

            res.send(upatedTask);
        });
    });
};
