var db = require("../models");
var express = require("express");
//create the router
var router = express.Router();

//get all ideas and include tech associated with ideas
//get data for idea generator
//Fix: limit tech gets
router.get("/", function(request, response) {
	db.Idea.findAll({
		include: [db.Tech, db.User, db.Project]
	}).then(function(allIdea) {
		var ideaObj = {
			idea: allIdea
		};
		response.json(ideaObj); //once handlebar views made change to response.render("", ideaObj);
		console.log("Find all ideas working!");
	}).catch(function(error){
		console.log(error); //display error, change to http errors
	});
});

//add new idea from forms page on user dashboard
//Fix: need to include UserId and Teches, how to post to these?
router.post("/add", function(request, response) {
	console.log(request.body);
	var idea = db.Idea.create({
		name: request.body.name,
		description: request.body.description,
		githubSource: request.body.githubSource,
		timeFrame: request.body.timeFrame
	}).then(function(idea){
		console.log(idea);
		var techArray = [1, 2, 3]; //on click, push id of tech to this array (hard code test)
		
		return db.Tech.findAll({
			where: {
				id: techArray
			}
		}).then(function(tech){
			tech.addIdeas(idea); //Make association to idea
			console.log("Added new idea and associated to techs!");
			response.redirect("/");
		}).catch(function(error){
			console.log(error);
		});
	}).catch(function(error){
		console.log(error);
	});
});


//update idea (only for users who have submitted an idea)
//should be able to update from user dashboard
router.put("/update/:id", function(request, response) {
	db.Idea.update({
		name: request.body.name,
		description: request.body.description,
		githubSource: request.body.githubSource,
		timeFrame: request.body.timeFrame
	}, {
		where: {
	  		id: request.params.id
		}
	}).then(function(updates){
		console.log("Updated idea!");
		response.redirect("/");
	});
});

//delete idea (but should users be allowed to delete ideas?)
//should be able to delete from user dashboard
router.delete("/delete/:id", function(request, response) {
	db.Idea.destroy({
		where: {
			id: request.params.id
		}
	}).then(function(dbIdea) {
		console.log("Deleted idea!");
		response.redirect("/");
	});
});

module.exports = router;