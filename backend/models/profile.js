var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var profileSchema = mongoose.Schema({
  username: String,
  usernamei: String,
  email: {
    type: String,
    select: false
  },
  emaili: {
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
//Methods will be used on a return Profile object
profileSchema.statics.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
profileSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

//Statics will be present on the imported Profile class
profileSchema.statics.deleteProfile = function(id) {
  return Profile.remove({'_id': id});
};

//Statics will be present on the imported Profile class
profileSchema.statics.getProfile = function(id) {
  return Profile.find({'_id': id}).limit(-1).then((profile) => {
    return (profile && profile[0]) || null
  });
};

// create the model for Profile and expose it to our app
var Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
