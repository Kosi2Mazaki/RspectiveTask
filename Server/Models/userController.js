'use strict';

var config = require('../config');
var mongoose = require('mongoose');
var common = require('./common');
var User = require('./user');
var webToken = require('jsonwebtoken');



/**
 * Used to create a new user in the database
 * @param  {object} req request passed to the controller
 * @param  {object} res response send by the server
 */
exports.create_user = function (req, res) {
    var user = new User(req.body);
    user.save(function (err) {
        if (err) {
            common.handleError("An error occurred while creating a user", err, res);
        } else {
            console.log("User created");
            res.send("User created.");
        }
    });
};

/**
 * Used to get all users from the database
 * @param  {object} req request passed to the controller
 * @param  {object} res response send by the server
 */
exports.get_users = function (req, res) {
    User.find({}, function (err, users) {
        if (err) {
            common.handleError("Error while fetching users", err, res);
        } else {
            res.send(users);
        }
    });
};

/**
 * Used to authenticate the user - create a token
 * @param  {object} req request passed to the controller
 * @param  {object} res response send by the server
 */
exports.authenticate = function (req, res) {
    User.findOne({ name: req.body.name }, function (err, user) {
        if (err) {
            common.handleError("Error while authenticating the user", err, res);
        } else {
            if (!user) {
                res.status(401).send('User not authenticated!');
            } else if (user.password !== req.body.password) {
                res.status(401).send('User not authenticated!');
            } else {
                var token = webToken.sign(user, config.secret, {
                    expiresIn: '2h' // expires in 2 hours
                });
                res.send(token);
            }
        }
    });
};

/**
 * Used to authenticate the user - checks a token
 * @param  {object} req request passed to the controller
 * @param  {object} res response send by the server
 */
exports.verifyToken = function (token, response) {
    webToken.verify(token, config.secret, function (err, publicKey) {
        if (err) {
            common.handleError("Token not authorized!", "Please authenticate", response);
            return false;
        }

        return true;
    });
};