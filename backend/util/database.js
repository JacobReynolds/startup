const mongoose = require('mongoose');
const MONGOOSE_DISCONNECTED = 0;
const MONGOOSE_CONNECTED = 1;
const MONGOOSE_DISCONNECTING = 3;
var connectionString;
const databaseOptions = {
  server: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000
    }
  },
  replset: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000
    }
  }
};
if (process.env.NODE_ENV == "offline") {
  connectionString = "mongodb://" + process.env.MONGODB_HOST + "/" + process.env.MONGODB_DATABASE;
} else {
  connectionString = "mongodb://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@" + process.env.MONGODB_HOST + "/" + process.env.MONGODB_DATABASE;
}

//Single place to handle DB connections.  Does some checking for open connections and whatnot.
module.exports.waitForDBConnection = (callback) => {
  return new Promise((resolve, reject) => {
    if (mongoose.connection.readyState == MONGOOSE_CONNECTED) {
      return resolve()
    } else if (mongoose.connection.readyState == MONGOOSE_DISCONNECTED || mongoose.connection.readyState == MONGOOSE_DISCONNECTING) {
      //If we're disconnected or disconnecting, open a new connection
      db = mongoose.connect(connectionString, databaseOptions).connection;
    }
    //We either returned when a previous connection existed, or we're going to wait for the new connection to open
    db.once('open', resolve);
  })
}

module.exports.disconnectMongoose = () => {
  //Don't disconnect if we're offline, breaks shit.
  if (mongoose.connection.readyState == MONGOOSE_CONNECTED && !process.env.IS_OFFLINE) {
    mongoose.disconnect();
  }
}
