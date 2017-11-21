const async = require('asyncawait/async');
const await = require('asyncawait/await');
const responses = require('../util/response.js');
const successfulResponse = responses.successfulResponse;
const unsuccessfulResponse = responses.unsuccessfulResponse;
const waitForDBConnection = require('../util/database.js').waitForDBConnection;
const parser = require('../util/parser.js');
const profileController = require('../controllers/profile.js');
const logger = require('../util/logger.js');

module.exports.register = async((event, context, callback) => {
  try {
    await(parser.checkRequestAndParseBody(event, callback, ['username', 'email', 'password']))
  } catch (e) {
    //Just return, all parser errors should return themselves
    return;
  }
  await(waitForDBConnection());
  try {
    var message = await(profileController.register(event.body.username, event.body.email, event.body.password));
    return successfulResponse(message, callback)
  } catch (e) {
    logger.log("action", "profile", "register", e);
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
    await(profileController.forgotPassword(event.body.email));
    return successfulResponse(null, callback)
  } catch (e) {
    logger.log("action", "profile", "forgotPassword", e);
    return unsuccessfulResponse(e, callback)
  }
})

module.exports.deleteProfile = async((event, context, callback) => {
  try {
    await(parser.checkRequestAndParseBody(event, callback))
  } catch (e) {
    //Just return, all parser errors should return themselves
    return;
  }
  await(waitForDBConnection());
  try {
    await(profileController.deleteProfile(event.requestContext.authorizer.profileId));
    return successfulResponse(null, callback)
  } catch (e) {
    logger.log("action", "profile", "deleteProfile", e);
    return unsuccessfulResponse(e, callback)
  }
})

module.exports.resetPassword = async((event, context, callback) => {
  try {
    await(parser.checkRequestAndParseBody(event, callback, ['password', 'resetToken']))
  } catch (e) {
    //Just return, all parser errors should return themselves
    return;
  }
  await(waitForDBConnection());
  try {
    await(profileController.resetPassword(event.body.password, event.body.resetToken));
    return successfulResponse(null, callback)
  } catch (e) {
    logger.log("action", "profile", "resetPassword", e);
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
    var token = await(profileController.login(event.body.email, event.body.password));
    return successfulResponse(token, callback)
  } catch (e) {
    logger.log("action", "profile", "login", e);
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
    var token = await(profileController.logoff(event.requestContext.authorizer.token));
    return successfulResponse(token, callback)
  } catch (e) {
    logger.log("action", "profile", "logoff", e);
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
    var profile = await(profileController.profile(event.requestContext.authorizer.profileId));
    return successfulResponse(profile, callback)
  } catch (e) {
    logger.log("action", "profile", "profile", e);
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
    var message = await(profileController.confirmEmail(event.body.confirmationToken));
    return successfulResponse(message, callback)
  } catch (e) {
    logger.log("action", "profile", "confirmProfile", e);
    return unsuccessfulResponse(e, callback)
  }
})
