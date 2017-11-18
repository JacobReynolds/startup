const tokenHeaderValue = "ServAuth";
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const responses = require('./util/response.js');
const successfulResponse = responses.successfulResponse;
const unsuccessfulResponse = responses.unsuccessfulResponse;
const auth = require('./util/auth.js');
const database = require('./util/database.js')
const waitForDBConnection = database.waitForDBConnection;
const disconnectMongoose = database.disconnectMongoose;
const parser = require('./util/parser.js');
const userController = require('./controllers/user.js');
const Session = require('./models/session.js');
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

module.exports.run = async((event, context, callback) => {
  try {
    await(parser.checkRequestAndParseBody(event, callback))
  } catch (e) {
    //Just return, all parser errors should return themselves
    return;
  }
  console.log("Request received with payload:", JSON.stringify(event.body));
  return successfulResponse("Data received", callback)
})

module.exports.register = async((event, context, callback) => {
  try {
    await(parser.checkRequestAndParseBody(event, callback, ['username', 'email', 'password']))
  } catch (e) {
    //Just return, all parser errors should return themselves
    return;
  }
  await(waitForDBConnection());
  try {
    var message = await(userController.register(event.body.username, event.body.email, event.body.password));
    return successfulResponse(message, callback)
  } catch (e) {
    return unsuccessfulResponse(e, callback)
  }
})

module.exports.forgotPassword = async((event, context, callback) => {
  try {
    await(parser.checkRequestAndParseBody(event, callback, ['email']))
  } catch (e) {
    //Just return, all parser errors should return themselves
    return;
  }
  await(waitForDBConnection());
  try {
    await(userController.forgotPassword(event.body.email));
    return successfulResponse(null, callback)
  } catch (e) {
    return unsuccessfulResponse(e, callback)
  }
})

module.exports.resetPassword = async((event, context, callback) => {
  try {
    await(parser.checkRequestAndParseBody(event, callback, ['password','resetToken']))
  } catch (e) {
    //Just return, all parser errors should return themselves
    return;
  }
  await(waitForDBConnection());
  try {
    await(userController.resetPassword(event.body.password, event.body.resetToken));
    return successfulResponse(null, callback)
  } catch (e) {
    return unsuccessfulResponse(e, callback)
  }
})

module.exports.login = async((event, context, callback) => {
  try {
    await(parser.checkRequestAndParseBody(event, callback, ['email', 'password']))
  } catch (e) {
    //Just return, all parser errors should return themselves
    return;
  }
  await(waitForDBConnection());
  try {
    var token = await(userController.login(event.body.email, event.body.password));
    return successfulResponse(token, callback)
  } catch (e) {
    return unsuccessfulResponse(e, callback)
  }
})

module.exports.logoff = async((event, context, callback) => {
  try {
    await(parser.checkRequestAndParseBody(event, callback))
  } catch (e) {
    //Just return, all parser errors should return themselves
    return;
  }
  await(waitForDBConnection());
  try {
    var token = await(userController.logoff(event.requestContext.authorizer.token));
    return successfulResponse(token, callback)
  } catch (e) {
    return unsuccessfulResponse(e, callback)
  }
})
module.exports.profile = async((event, context, callback) => {
  try {
    await(parser.checkRequestAndParseBody(event, callback))
  } catch (e) {
    //Just return, all parser errors should return themselves
    return;
  }
  await(waitForDBConnection());
  try {
    var profile = await(userController.profile(event.requestContext.authorizer.userId));
    return successfulResponse(profile, callback)
  } catch (e) {
    return unsuccessfulResponse(e, callback)
  }
})
module.exports.confirmProfile = async((event, context, callback) => {
  try {
    await(parser.checkRequestAndParseBody(event, callback, ['confirmationToken']))
  } catch (e) {
    //Just return, all parser errors should return themselves
    return;
  }
  await(waitForDBConnection());
  try {
    var message = await(userController.confirmEmail(event.body.confirmationToken));
    return successfulResponse(message, callback)
  } catch (e) {
    return unsuccessfulResponse(e, callback)
  }
})
