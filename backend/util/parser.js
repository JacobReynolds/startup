var validator = require('./validator.js');
const unsuccessfulResponse = require('./response.js').unsuccessfulResponse;

//Returns true if there are any errors
module.exports.checkRequestAndParseBody = (event, callback) => {
  return new Promise((resolve, reject) => {
    if (event && event.body && !(typeof event.body === "object")) {
      event.body = JSON.parse(event.body);
    }
    //If it returns
    var error = validationMiddleware(event, callback);
    if (error.then) { //Is there a promise
      error.then((err) => {
        if (err) { //Err already called the unsuccessfulResponse() so just reject
          reject()
        } else {
          resolve()
        }
      }).catch((error) => {
        resolve()
      })
    } else if (!error) {
      resolve()
    }
  })
}

function validationMiddleware(event, callback, requiredParams=[]) {
  if (!event.queryStringParameters) {
    event.queryStringParameters = {};
  }
  if (!event.body) {
    event.body = {};
  }
  var promises = []
  //In case we need to do any input validations that require HTTP requests/etc
  if (event.body.examplePromise) {
    promises.push(validator.DisplayImageValidator(event.body.examplePromise));
  }
  //Should abstract this so the validator function is the same as the parameter name, then can just loop like we do in ../../util/Form.jsx
  var validation;
  var requiredIndex = -1;
  //Check the body for required parameters and validate any inputs
  for (var key in event.body) {
    if (typeof key == "string" && validator[key]) {
      requiredIndex = requiredParams.indexOf(key);
      if (requiredIndex > -1) {
        requiredParams.splice(requiredIndex, 1);
      }
      if (validation = validator[key](event.body[key])) {
        return unsuccessfulResponse(validation, callback);
      }
    }
  }
  if (requiredParams.length > 0) {
    return unsuccessfulResponse("Missing required parameters: " + requiredParams.join(','), callback);
  }
  return Promise.all(promises).then(() => {
    return false;
  }).catch((error) => {
    unsuccessfulResponse(error.error, callback);
    return true;
  })
}
