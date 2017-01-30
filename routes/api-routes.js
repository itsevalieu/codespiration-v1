// Project 2 - API Routes
var db = require("../models");
module.exports = function(app){

	app.get("/api/projects", function(request, response){
		db.Project.findALl({}).then(function(data){
		response.json(data);	
		});
	});
	
	app.post("/api/projects", function(request, response){
		
	});
	
	app.delete("/api/projects/:id", function(request, response){
		
	});
	
	app.put("/api/projects", function(request, response){
		db.Project.update({}).then(function(data){
			response.json(data);
		});
	});
};