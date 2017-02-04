// Project 2 - HTML routes
var path = require("path");

module.exports = function(app){
	app.get("/", function(request, response){
		response.render("idea");
	});
	
	app.get("/dashboard", function(request, response){
		response.render("users",{layout:"dashboard.handlebars"});
	});
	
	app.get("/generator", function(request, response){
		response.render("tech",{layout: "generator.handlebars"});
	});
	
	app.get("/submissions", function(request, response){
		response.render("project", {layout: "submission.handlebars"});
	});
};
