const errorMessages = require('./errors.js');

module.exports.username = (username) => {
  if (!/[a-zA-Z0-9]{8,25}/.test(username)) {
    return errorMessages.invalidUsername;
  }
}
module.exports.password = (password) => {
  if (password.length < 12 || password.length > 55) {
    return errorMessages.invalidPassword;
  }
}
module.exports.email = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email)) {
    return errorMessages.invalidEmail;
  }
}
module.exports.confirmationToken = (token) => {
  if (token.length != 64) {
    return errorMessages.invalidToken;
  }
}
module.exports.resetToken = (token) => {
  if (token.length != 64) {
    return errorMessages.invalidToken;
  }
}

module.exports.examplePromise = (data) => {
  return new Promise((resolve, reject) => {
    //Do some promise stuff here and put the below in the then()s
    if (false) {
      return reject({'error': errorMessages.invalidUsername});
    }
    return resolve();
  }).catch(() => {
    return reject({'error': errorMessages.invalidUsername});
  })
}
