const tokenHeaderValue = "ServAuth";
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const responses = require('../util/response.js');
const successfulResponse = responses.successfulResponse;
const unsuccessfulResponse = responses.unsuccessfulResponse;
const database = require('../util/database.js')
const waitForDBConnection = database.waitForDBConnection;
const disconnectMongoose = database.disconnectMongoose;
const Session = require('../models/session.js');
const authController = require('../controllers/auth.js');
const logger = require('../util/logger.js');

module.exports.authorizerFunc = async((event, context, callback) => {
  try {
    var token = event.authorizationToken;
    token = token.split(tokenHeaderValue + " ");
    if (token.length === 2 && token[1]) {
      token = token[1];
    } else {
      return unsuccessfulResponse({
        "error": "error"
      }, callback)
    }
    await(waitForDBConnection());
    Session.findOne({
      token: token
    }, function(err, session) {
      if (err || !session) {
        callback(null, authController.generatePolicy('user', 'Deny', event.methodArn));
      } else {
        callback(null, authController.generatePolicy('user', 'Allow', '*', session.id, session.username, token));
      }
      return disconnectMongoose();
    });
  } catch (e) {
    logger.log("action", "auth", "authorizerFunc", e);
  }
})
