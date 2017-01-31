var db = require("../models");
var express = require("express");
//create the router
var router = express.Router();

router.get("/", function(request, response) {
	db.Idea.findAll({}).then(function(allIdea) {
		var ideaObj = {
			idea: allIdea
		};
		response.json(ideaObj);
		console.log("Find all ideas working!");
	});
});

module.exports = router;