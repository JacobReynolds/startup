const disconnectMongoose = require('./database.js').disconnectMongoose;
/*
Response options:
  cors [true/false]

*/
module.exports.successfulResponse = (data, callback, options = {}) => {
  disconnectMongoose();
  if (typeof callback == 'function') {
    var headers;
    if (options.cors) {
      headers = {
        "Access-Control-Allow-Origin": "*" // Required for CORS support to work
      }
    }
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(data),
      headers
    })
  }
}

module.exports.unsuccessfulResponse = (data, callback, options = {}) => {
  disconnectMongoose();
  if (typeof callback == 'function') {
    var headers;
    if (options.cors) {
      headers = {
        "Access-Control-Allow-Origin": "*" // Required for CORS support to work
      }
    }
    return callback(null, {
      statusCode: 500,
      body: JSON.stringify({message: data}),
      headers
    })
  }
}
