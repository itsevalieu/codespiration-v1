var db = require("../models");
var express = require("express");
//create the router
var router = express.Router();

//get all users and associated ideas, projects, and tech they know
//get data is for profile(tech) and dashboard(ideas, projects)
//Fix: limit includes to only necessary ones; how? Need to reference join table (projectTeam)
router.get("/", function(request, response) {
  db.User.findAll({
    include: [db.Idea, db.Project, db.Tech]
  }).then(function(allUser) {
    var userObj = {
      user: allUser
    };
    response.json(userObj);
    console.log("Find all users working!");
  });
});

//add new user for registration
//Fix: need to be able to reference join table for user and tech (techUsers)
router.post("/add", function(request, response) {
  db.User.create({
    name: request.body.name,
    email: "temp",
    github: "temp",
    password: request.body.password
  }).then(function(){
    console.log("Added new user!");
    response.redirect("/");
  });
});

//update user info for profile settings page
router.put("/update/:id", function(request, response) {
  db.User.update({
    name: request.body.name,
    email: request.body.email,
    github: request.body.github,
    password: request.body.password
  }, {
    where: {
      id: request.params.id
    }
  }).then(function(updates){
    console.log("Updated user!");
    response.redirect("/");
  });
});

//delete user account for profile settings page
router.delete("/delete/:id", function(request, response) {
  db.User.destroy({
    where: {
      id: request.params.id
    }
  }).then(function(dbUser) {
    console.log("Deleted user!");
    response.redirect("/");
  });
});

module.exports = router;