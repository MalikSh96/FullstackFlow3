var mongoose = require('mongoose');
//let dbURI = "mongodb://miniprojectusr:test@ds213118.mlab.com:13118/miniproject";
let dbURI = "mongodb+srv://MongoAdmin:MongoPW@cluster0-vefab.azure.mongodb.net/miniproject?retryWrites=true";

function setDbUri(uri){
  dbURI = uri;
}

function connect(){
  return mongoose.connect(dbURI);  
}

mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

module.exports = {
  dbURI: dbURI,
  setDbUri: setDbUri,
  connect: connect
}