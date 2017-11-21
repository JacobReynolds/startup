const async = require('asyncawait').async;
const await = require('asyncawait').await;
const Profile = require('../models/profile.js');
const Session = require('../models/session.js');
const sendEmail = require('../util/email.js');
const logger = require('../util/logger.js');
const crypto = require('crypto');

const generateKey = () => {
  var sha = crypto.createHash('sha256');
  sha.update(Math.random().toString());
  return sha.digest('hex');
}

module.exports.register = async((username, email, password) => {
  try {
    var profileSearch = await(Profile.findOne({
      $or: [
        {
          'emaili': {
            $regex: email.toLowerCase()
          }
        }, {
          "usernamei": username.toLowerCase()
        }
      ]
    }, 'email confirm usernamei'))
    // if there are any errors, return the error
    if (profileSearch && (profileSearch.usernamei == username.toLowerCase())) {
      throw "Username already taken";
    } else if (profileSearch && profileSearch.confirm) {
      sendEmail.sendEmailConfirmation(profileSearch.email, profileSearch.confirm);
      return {message: 'Please check your email to confirm'};
    } else if (profileSearch) {
      sendEmail.sendEmailAlreadyRegistered(profileSearch.email);
      return {message: 'Please check your email to confirm'};
    } else {
      var newProfile = new Profile();
      newProfile.username = username;
      newProfile.usernamei = username.toLowerCase();
      newProfile.email = email;
      newProfile.emaili = email.toLowerCase();
      newProfile.password = Profile.generateHash(password);
      newProfile.confirm = generateKey();
      sendEmail.sendEmailConfirmation(newProfile.email, newProfile.confirm);
      await(newProfile.save());
      return {message: 'Please check your email to confirm'};
    }
  } catch (e) {
    logger.log("controller", "profile", "register", e);
    throw e;
  }
})

module.exports.login = async((email, password) => {
  try {
    var profile = await(Profile.findOne({'emaili': email.toLowerCase()}).select('password confirm email username').exec());
  } catch (e) {
    logger.log("controller", "profile", "login.1", e);
    throw e;
  }
  if (!profile) {
    throw "Incorrect email or password";
  }
  if (profile.confirmationLink) {
    throw "Please confirm your email";
  }
  if (!profile.validPassword(password)) {
    throw "Incorrect email or password";
  }
  const token = generateKey();
  var sess;
  try {
    sess = await(Session.findOne({token}));
  } catch (e) {
    logger.log("controller", "profile", "login.2", e);
    throw "Error generating session";
  }
  if (sess) {
    //Need a new token
    //Could make this recursive to try a new one automatically, but lets give it some time just in case
    //This is also an extreme edge case
    logger.log("controller", "profile", "login.3", "Duplicate session token generated, denying.");
    throw "Error logging in, please try again."
  } else {
    try {
      await(Session.create({token, 'id': profile._id, 'username': profile.username}))
      return {token};
    } catch (e) {
      logger.log("controller", "profile", "login.4", e);
      throw "Error generating session"
    }
  }
  return {token};
})

module.exports.deleteProfile = async((id) => {
  try {
    await(Promise.all([Profile.deleteProfile(id), Session.deleteSessions(id)]));
    return "Profile deleted successfully";
  } catch (e) {
    logger.log("controller", "profile", "deleteProfile", e);
    throw "Error deleting profile";
  }
})

module.exports.forgotPassword = async((email, password) => {
  try {
    const reset = generateKey();
    const profile = await(Profile.findOneAndUpdate({
      email
    }, {reset}))
    if (profile) {
      sendEmail.sendForgotPassword(email, reset);
    }
    return;
  } catch (e) {
    logger.log("controller", "profile", "forgotPassword", e);
    throw "Error sending forgot password email";
  }
})

module.exports.resetPassword = async((password, reset) => {
  try {
    const forgot = generateKey();
    await(Profile.update({
      reset: reset
    }, {password: Profile.generateHash(password)}));
    return;
  } catch (e) {
    logger.log("controller", "profile", "resetPassword", e);
    throw "Error resetting password";
  }
})

module.exports.confirmEmail = async((confirmationToken) => {
  try {
    await(Profile.update({
      'confirm': confirmationToken
    }, {
      $unset: {
        confirm: 1
      }
    }))
    return;
  } catch (e) {
    logger.log("controller", "profile", "confirmEmail", e);
    throw "Error confirming email";
  }
})

module.exports.logoff = async((token) => {
  try {
    console.log("Removing session",token);
    await(Session.remove({token}))
    return;
  } catch (e) {
    logger.log("controller", "profile", "logoff", e);
    throw "Error logging off";
  }
})

module.exports.profile = async((profileId) => {
  try {
    var profile = await(Profile.getProfile(profileId))
    return {username: profile.username};
  } catch (e) {
    logger.log("controller", "profile", "profile", e);
    throw "Error getting profile";
  }
})
