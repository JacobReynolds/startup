var mailgun = require('mailgun.js');
var mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || "error"
});

const DOMAIN = getDomain();

function getDomain() {
  switch (process.env.NODE_ENV) {
    case "dev":
      return "http://localhost:3001";
      break;
  }
}

function passwordResetTemplate(token) {
  return 'Hi!<br/><br/>We received a request to reset the password for your account.<br/><br/>To reset your password, click on the link below (or copy and paste the URL into your browser):<br/><br/><a href="' + DOMAIN + '/profile/reset/' + token + '" target="_blank">Click here to reset your password</a><br/><br/>Jake';
}

function confirmationLinkTemplate(token) {
  return 'Hello, please confirm your email address by clicking <a href="' + DOMAIN + '/profile/confirm/' + token + '" target="_blank">here</a><br/><br/>Jake';
}

function emailAlreadyRegisteredTemplate() {
  return 'This email is already registered on Pushwave, you can login <a href="' + DOMAIN + '/login">here</a>!<br/><br/>~Your Pushwave Team';
}


function sendEmail(to, from, subject, message) {
  mg.messages.create('mg.jakereynolds.co', {
      from: "Admin <" + from + ">",
      to: [to],
      subject: subject,
      html: message
    })
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.log(err)); // logs any error
}

function sendEmailConfirmation(to, confirmationLink) {
  sendEmail(to, "admin@jakereynolds.co", "Please confirm your account", confirmationLinkTemplate(confirmationLink));
}

function sendForgotPassword(to, token) {
  sendEmail(to, "admin@jakereynolds.co", "Password reset", passwordResetTemplate(token));
}

function sendEmailAlreadyRegistered(to) {
  sendEmail(to, "admin@jakereynolds.co", "Account registration", emailAlreadyRegisteredTemplate());
}

module.exports = {
  sendEmailConfirmation: sendEmailConfirmation,
  sendForgotPassword: sendForgotPassword,
  sendEmailAlreadyRegistered: sendEmailAlreadyRegistered
};
