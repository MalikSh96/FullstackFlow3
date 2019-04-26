var connect = require("./dbSetup.js");
connect(require("./dbSetup.js").dbURI);
var User = require("./models/user.js");
var locationBlog = require("./models/locationBlog.js");
var position = require("./models/position.js");

function positionCreator(lon, lat, userId, dateInFuture) {
var positionDetails = { user: userId, loc: { coordinates: [lon, lat] } }
if (dateInFuture) {
  positionDetails.created = "2022-09-25T20:40:21.899Z"
}
return positionDetails;
}

function makeUsers() {
try {
  var userInformation = [{firstName : "Gert",lastName : "Hansen", userName :"gert123",password: "hansen123",}
  ,
  {firstName : "Lasse",lastName : "Andersen", userName :"lasse123",password: "andersen123"}
  ,
  {firstName : "Morten",lastName : "Jensen", userName :"morten123",password: "jensen123"}];
var users = User.insertMany(userInformation);

var positions = [positionCreator(3, 4, users[0]._id),positionCreator(10, 11, users[1]._id, true)];
position.insertMany(positions);
} catch (error) {
  console.log(error);
}
}
makeUsers();