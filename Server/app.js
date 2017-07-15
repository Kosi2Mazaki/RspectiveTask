var path = require('path')
var express = require('express')
var cors = require('cors')
var app = express()
var config = require('./config')
var mongoose = require('mongoose')
var Task = require('./Models/task')
var User = require('./Models/user')
var taskController = require('./Models/taskController')
var userController = require('./Models/userController')
var bodyParser = require('body-parser')
var common = require('./Models/common')
var webToken = require('jsonwebtoken')

app.use(cors());

// enable parameters parsing
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// disable all warnings about deprecated modules
mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useMongoClient: true });

// First route - NOT PROTECTED
app.route('/authenticate')
    .post(userController.authenticate);

app.route('/users')
    .post(userController.create_user);

// AUTHENTICATION!!!!
app.use((request, response, next) => {
    var token = request.headers.authorization;
    if (!token) {
        common.handleError("Token not present", 'Please authenticate first', response);
    } else {
        webToken.verify(token, config.secret, function (err, publicKey) {
            if (err) {
                common.handleError("Token not authorized!", err, response);
            } else {
                request.decoded = publicKey;
                next();
            }
        });
    }
});

// Routes
app.route('/tasks')
    .get(taskController.list_all_tasks)
    .post(taskController.create_task);

app.route('/tasks/:id')
    .get(taskController.get_task)
    .post(taskController.create_subtask)
    .delete(taskController.remove_task);

app.route('/users')
    .get(userController.get_users);

// ERROR Handler
app.use((err, request, response, next) => {
    console.log(err)
    response.status(500).send('Ups! You have some nasty Error!')
});

app.listen(3003, function () {
    console.log('Example app listening on port 3000!')
});
