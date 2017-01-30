// Project 2 - API Routes
var db = require("../models");
module.exports = function (app) {

	app.get("/api/projects", function (request, response) {
		db.Project.findALl({}).then(function (data) {
			response.json(data);
		});
	});

	app.post("/api/projects", function (request, response) {
		db.Project.create({
			name: request.body.name,
			completed: false,
			currentProject: true,
			githubLink: request.body.githubLink,
		}).then(function (data) {
			response.json(data);
		});
	});

	app.delete("/api/projects/:id", function (request, response) {
		db.Project.destroy({
			where: {
				id: request.params.id
			}
		}).then(function (data) {
			response.json(data);
		});
	});

	app.put("/api/projects", function (request, response) {
		db.Project.update({
			name: request.body.name,
			completed: request.body.name,
			currentProject: request.body.currentProject,
			githubLink: request.body.currentProject
		}).then(function (data) {
			response.json(data);
		});
	});

	app.get("/api/tech", function (request, response) {
		db.Tech.findAll({}).then(function (data) {
			response.json(data);
		});
	});

	app.post("/api/tech", function (request, response) {
		db.Tech.create({
			name: request.body.name,
			techType: request.body.techType,
			frontend: request.body.frontend,
			backend: request.body.backend,
			documentation: request.body.documentation
		}).then(function (data) {
			response.json(data);
		});
	});

	app.delete("/api/tech/:id", function (request, response) {
		db.Tech.destroy({
			where:{
				id: request.params.id
			}
		}).then(function(data){
			response.json(data);
		});
	});

	app.put("/api/tech", function (request, response) {
		db.Tech.update({}).then(function (data) {
			reponse.json(data);
		});
	});


};
