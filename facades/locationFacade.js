const locationBlog = require("../models/locationBlog.js");

function addLocationBlog(info, pos ,author) {
    var location = new LocationBlog({
        info, 
        pos, 
        author
    });
    location.save(location);
}

function likeLocationBlog(blogid, userid){
    var blog = locationBlog.findOneAndUpdate({_id : [blogid]}, { $push: {likedBy: userid} }, {new: true}).exec();
    return blog;
  }

module.exports = {
    addLocationBlog: addLocationBlog,
    likeLocationBlog: likeLocationBlog
}