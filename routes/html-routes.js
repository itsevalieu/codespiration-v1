// Project 2 - HTML routes
var path = require("path");

module.exports = function(app){
	app.get("/", function(request, response){
		response.render("idea");
	});
};