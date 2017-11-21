var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sessionSchema = mongoose.Schema({token: String, id: Schema.Types.ObjectId, username: String});

sessionSchema.virtual('usernamei').get(function() {
  return this.username.toLowerCase();
});

//Statics will be present on the imported Profile class
sessionSchema.statics.deleteSessions = function(id) {
  return Session.remove({'id': id});
};

// create the model for session and expose it to our app
var Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
