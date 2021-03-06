module.exports.generatePolicy = (principalId, effect, resource, profileId, username, token) => {
  var authResponse = {};

  authResponse.principalId = principalId;
  if (effect && resource) {
    var policyDocument = {};
    policyDocument.Version = '2012-10-17'; // default version
    policyDocument.Statement = [];
    var statementOne = {};
    statementOne.Action = 'execute-api:Invoke'; // default action
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }

  // Can optionally return a context object of your choosing.
  authResponse.context = {};
  authResponse.context.profileId = profileId;
  authResponse.context.username = username;
  authResponse.context.token = token;
  return authResponse;
}
