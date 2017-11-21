String.prototype.format = function() {
  a = this;
  for (k in arguments) {
    a = a.replace("{" + k + "}", arguments[k])
  }
  return a
}
module.exports.log = (type, file, functionName, error) => {
  console.log("Error in {0}.{1}.{2}: {3}".format(type, file, functionName, error));
}
