var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var userSchema = mongoose.Schema({
  username: String,
  usernamei: String,
  email: {
    type: String,
    select: false
  },
  password: {
    type: String,
    select: false
  },
  confirm: String,
  reset: String
});
//Methods will be used on a return User object
userSchema.statics.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

//Statics will be present on the imported User class
userSchema.statics.deleteProfile = function(id) {
  return User.remove({'_id': id});
};

// create the model for user and expose it to our app
var User = mongoose.model('User', userSchema);
module.exports = User;
