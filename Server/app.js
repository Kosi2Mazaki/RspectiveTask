'use strict';
var path = require('path');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Task = require('./Models/task');
var taskController = require('./Models/taskController');
var bodyParser = require('body-parser');

// enable parameters parsing
app.use(bodyParser.urlencoded({
    extended: true
}));

// disable all warnings about deprecated modules
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/RspectiveTaskDB', { useMongoClient: true });

app.route('/tasks')
    .get(taskController.list_all_tasks)
    .post(taskController.create_task);


app.route('/tasks/:id')
    .get(taskController.get_task)
    .post(taskController.create_subtask)
    .delete(taskController.remove_task);

// ERROR Handler
app.use((err, request, response, next) => {
    console.log(err)
    response.status(500).send('Ups! You have some nasty Error!')
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});