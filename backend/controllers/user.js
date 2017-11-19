const async = require('asyncawait').async;
const await = require('asyncawait').await;
const User = require('../models/user.js');
const Session = require('../models/session.js');
const crypto = require('crypto');
const sendEmail = require('../util/email.js');

function escapeRegExp(str) {
  if (!str) {
    return null;
  }
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function generate_key() {
  var sha = crypto.createHash('sha256');
  sha.update(Math.random().toString());
  return sha.digest('hex');
};
function addToken(user, callback) {
  const tokenGen = generate_key();
  var sess;
  try {
    sess = await(Session.findOne({'token': tokenGen}));
  } catch (e) {
    console.log("Error:", e);
    throw "Error generating session";
  }
  if (sess) {
    //Need a new token
    addToken(user, callback);
  } else {
    await(Session.create({'token': tokenGen, 'id': user._id, 'username': user.username}))
    return tokenGen;
  }
}
module.exports.register = async((username, email, password) => {
  try {
    var userSearch = await(User.findOne({
      $or: [
        {
          'email': {
            $regex: new RegExp('^' + escapeRegExp(email) + '$', 'i')
          }
        }, {
          "usernamei": username.toLowerCase()
        }
      ]
    }))
    // if there are any errors, return the error
    if (userSearch && (userSearch.usernamei == username.toLowerCase())) {
      throw "Username already taken";
    } else if (userSearch) {
      return {message: 'Please check your email to confirm'};
    } else {
      var newUser = new User();
      newUser.username = username;
      newUser.usernamei = username.toLowerCase();
      newUser.email = email;
      newUser.password = User.generateHash(password);
      const token = generate_key()
      newUser.confirm = token;
      sendEmail.sendEmailConfirmation(newUser.email, newUser.confirm);
      await(newUser.save());
      return {message: 'Please check your email to confirm'};
    }
  } catch (e) {
    console.log("Error:", e);
    throw e;
  }
})

module.exports.login = async((email, password) => {
  try {
    var user = await(User.findOne({'email': email}).select('password confirm email').exec());
    if (!user) {
      throw "Incorrect email or password";
    }
    if (user.confirmationLink) {
      throw "Please confirm your email";
    }
    if (!user.validPassword(password)) {
      throw "Incorrect email or password";
    }
    const token = await(addToken(user));
    return {token};
  } catch (e) {
    throw e;
  }
})

module.exports.deleteProfile = async((id) => {
  try {
    await(User.deleteProfile(id));
    return "Profile deleted successfully";
  } catch (e) {
    throw "Error deleting profile";
  }
})

module.exports.forgotPassword = async((email, password) => {
  try {
    const reset = generate_key();
    const user = await(User.findOneAndUpdate({
      email
    }, {
      reset
    }))
    if (user) {
      sendEmail.sendForgotPassword(email, reset);
    }
    return;
  } catch (e) {
    throw "Error sending forgot password email";
  }
})

module.exports.resetPassword = async((password, reset) => {
  try {
    const forgot = generate_key();
    await(User.update({
      reset: reset
    }, {password: User.generateHash(password)}));
    return;
  } catch (e) {
    console.log("Error:", e)
    throw "Error resetting password";
  }
})

module.exports.confirmEmail = async((confirmationToken) => {
  try {
    await(User.update({
      'confirm': confirmationToken
    }, {
      $unset: {
        confirm: 1
      }
    }))
    return;
  } catch (e) {
    throw "Error confirming email";
  }
})

module.exports.logoff = async((token) => {
  try {
    await(Session.remove({'token': token}))
    return;
  } catch (e) {
    throw "Error logging off";
  }
})

module.exports.profile = async((userId) => {
  try {
    var user = await(User.findOne({'_id': userId}))
    return {username: user.username};
  } catch (e) {
    throw "Error getting profile";
  }
})
