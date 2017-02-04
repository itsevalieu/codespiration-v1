var db = require("../models");
var express = require("express");
//create the router
var router = express.Router();

//get all tech, and associated ideas and users 
//get data for tech generator
//Fix: perhaps need to limit what is shown from ideas and users
router.get("/", function(request, response) {
	db.Tech.findAll({
		include: [db.Idea, db.User, db.Project]
	}).then(function(allTech) {
		var techObj = {
			tech: allTech
		};
		response.json(techObj);
		console.log("Find all tech working!");
	});
});

//add new tech, mostly for admin
router.post("/add", function(request, response) {
	db.Tech.create({
		name: request.body.name,
		techType: request.body.techType,
		frontend: request.body.frontend,
		backend: request.body.backend,
		documentation: request.body.documentation
	}).then(function(){
		console.log("Added new tech!");
		response.redirect("/tech");
	});
});

//update tech, not really necessary, but adding just in case
router.put("/update/:id", function(request, response) {
	db.Tech.update({
		name: request.body.name,
		techType: request.body.techType,
		frontend: request.body.frontend,
		backend: request.body.backend,
		documentation: request.body.documentation
	}, {
		where: {
			id: request.params.id
		}
	}).then(function(updates){
		console.log("Updated tech!");
		response.redirect("/");
	});
});

//delete tech
router.delete("/delete/:id", function(request, response) {
	db.Tech.destroy({
		where: {
			id: request.params.id
		}
	}).then(function(dbTech) {
		console.log("Deleted tech!");
		response.redirect("/");
	});
});

module.exports = router;