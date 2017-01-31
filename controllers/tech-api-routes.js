var db = require("../models");
var express = require("express");
//create the router
var router = express.Router();

router.get("/", function(request, response) {
	db.Tech.findAll({}).then(function(allTech) {
		var techObj = {
			tech: allTech
		};
		response.json(techObj);
		console.log("Find all tech working!");
	});
});


module.exports = router;