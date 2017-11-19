const tokenHeaderValue = "ServAuth";
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const responses = require('../util/response.js');
const successfulResponse = responses.successfulResponse;
const unsuccessfulResponse = responses.unsuccessfulResponse;
const auth = require('../util/auth.js');
const database = require('../util/database.js')
const waitForDBConnection = database.waitForDBConnection;
const disconnectMongoose = database.disconnectMongoose;
const parser = require('../util/parser.js');
const Session = require('../models/session.js');

module.exports.authorizerFunc = async((event, context, callback) => {
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
      callback(null, auth.generatePolicy('user', 'Deny', event.methodArn));
    } else {
      callback(null, auth.generatePolicy('user', 'Allow', '*', session.id, session.username, token));
    }
    return disconnectMongoose();
  });
})
