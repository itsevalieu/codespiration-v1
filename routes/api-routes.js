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
		}, {
			where: {
				id: request.params.id
			}
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
			where: {
				id: request.params.id
			}
		}).then(function (data) {
			response.json(data);
		});
	});

	app.put("/api/tech", function (request, response) {
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
		}).then(function (data) {
			response.json(data);
		});
	});

	app.get("/api/users", function (request, response) {
		db.User.findAll({}).then(function (data) {
			response.json(data);
		});
	});

	app.post("/api/users", function (request, response) {
		db.User.create({
			name: request.body.name,
			email: request.body.email,
			github: request.body.github,
			password: request.body.password,
			techKnown: request.body.techKnown
		}).then(function (data) {
			response.json(data);
		});
	});

	app.put("/api/users/:id", function (request, response) {
		db.User.update({
			name: request.body.name,
			email: request.body.email,
			github: request.body.github,
			password: request.body.password,
			techKnown: request.body.techKnown
		}, {
			where: {
				id: request.params.id
			}
		}).then(function (data) {
			response.json(data);
		});
	});

	app.delete("/api/users/:id", function (request, response) {
		db.User.destroy({
			where: {
				id: request.params.id
			}
		}).then(function (data) {
			response.json(data);
		});
	});

	app.get("/api/ideas", function (request, response) {
		app.Idea.findAll({}).then(function (data) {
			response.json(data);
		});
	});

	app.post("/api/ideas", function (request, response) {
		app.Idea.create({
			name: response.body.name,
			description: response.body.idea,
			githubSource: response.body.githubSource,
			timeFrame: response.body.timeFrame
		}).then(function (data) {
			response.json(data);
		});
	});

	app.put("/api/ideas/:id", function (request, response) {
		app.Idea.update({
			name: request.body.name,
			description: request.body.description,
			githubSource: request.body.githubSource,
			timeFrame: request.body.timeFrame
		}, {
			where: {
				id: request.params.id
			}
		}).then(function (data) {
			response.json(data);
		});
	});
};
