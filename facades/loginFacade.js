const userFacade = require("./userFacade");
var Position = require("../models/position.js");

function getMyPos(username) {

    let User = UserFacade.getUserByName(username);
    console.log(User[0]._id);
    return Position.find({ "user": User[0]._id });
}

function login(username, password, longitude, latitude) {
    const User = userFacade.getUserByName(username);
    if (User != null) {
        if (User[0].password === password) {
            const coordinates = [longitude, latitude];
            Position.findOneAndUpdate
                ({ "user": User[0]._id },
                { User, loc: { type: 'Point', coordinates } });
        }
    };
        const nearbyFriendsPositions = findNearbyFriends(
            coordinates,
            distance
        );
        return {
            friends: nearbyFriendsPositions.map(friendPos => {
                return {
                    username: friendPos.user.userName,
                    latitude: friendPos.loc.coordinates[0],
                    longitude: friendPos.loc.coordinates[1]
                };
            })
}; 
}

function findNearbyFriends(coordinates, distance) {
	return Position.find({
		loc: {
			$near: {
				$geometry: { type: 'Point', coordinates },
				$minDistance: 0.01,
				$maxDistance: distance}}}).populate('user').exec();
}

module.exports = { 
    login:login,
    getMyPos: getMyPos 
}