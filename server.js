//Dependencies
//============================================
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

//Assign PORT
//============================================
var PORT = process.env.NODE_ENV || 3000;
var app = express();

//Set up Express App to handle data parsing
//============================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//For the form override to use delete
//============================================
app.use(methodOverride("_method"));

// Set Handlebars as the default templating engine.
//============================================
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Static directory
//============================================
app.use(express.static(process.cwd() + "/public"));

//Establish Routes
//============================================

var ideaRoutes = require("./controllers/idea-api-routes.js");
var techRoutes = require("./controllers/tech-api-routes.js");
var userRoutes = require("./controllers/user-api-routes.js");
var projectRoutes = require("./controllers/project-api-routes.js");

app.use("/", ideaRoutes);
app.use("/tech", techRoutes);
app.use("/user", userRoutes);
app.use("/project", projectRoutes);


//Listener
//============================================
var db = require("./models");

db.sequelize.sync().then(function() {
	app.listen(PORT, function() {
	  console.log("Listening on PORT " + PORT);
	});
});