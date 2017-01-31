var db = require("../models");
var express = require("express");
//create the router
var router = express.Router();

router.get("/", function(request, response) {
	db.Project.findAll({}).then(function(allProject) {
		var projectObj = {
			project: allProject
		};
		response.json(projectObj);
		console.log("Find all projects working!");
	});
});

module.exports = router;