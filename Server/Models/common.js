'use strict';

/**
 * Used to handle server error. The message will be logged into the
 * console and than the 500 error will be returned as the response
 * @param {string} message - message to be passed to the application
 * @param {string} message - message to be passed to the application
 * @param {object} res - response object to send data back to the user
 */
exports.handleError = function (message, err, res) {
    console.log(message + ": " + err);
    res.status(500).send(message + ".");
}


