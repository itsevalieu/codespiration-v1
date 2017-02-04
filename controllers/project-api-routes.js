var db = require("../models");
var express = require("express");
//create the router
var router = express.Router();

//get all projects for users, and related tech-in-use data, users in the project, and the idea the project is from
//get data for user project to do list
//Fix: how to reference join tables and get only necessary data from it (projectTeam, Techprojects) 
router.get("/", function(request, response) {
	db.Project.findAll({
		include: [db.Tech, db.User, db.Idea]
	}).then(function(allProject) {
		var projectObj = {
			project: allProject
		};
		response.json(projectObj);
		console.log("Find all projects working!");
	});
});

//add new project to user to do list
//to be done from idea generator page
router.post("/add", function(request, response) {
	db.Project.create({
		githubProjectLink : request.body.githubProjectLink
	}).then(function(){
		console.log("Added new project!");
		response.redirect("/");
	});
});

//update project from user dashboard
router.put("/update/:id", function(request, response) {
	db.Project.update({
		completed: request.body.complete,
		currentProject: request.body.currentProject,
		githubLink: request.body.githubLink
	}, {
		where: {
			id: request.params.id
		}
	}).then(function(updates){
		console.log("Updated project!");
		response.redirect("/");
	});
});

//delete project from user dashboard to do list
router.delete("/delete/:id", function(request, response) {
	db.Project.destroy({
		where: {
			id: request.params.id
		}
	}).then(function(dbProject) {
		console.log("Deleted project!");
		response.redirect("/");
	});
});

module.exports = router;