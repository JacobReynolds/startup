var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sessionSchema = mongoose.Schema({
    token: String,
    id: Schema.Types.ObjectId,
    username: String
});


// create the model for session and expose it to our app
module.exports = mongoose.model('Session', sessionSchema);
