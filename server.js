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
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
	type: "application/vnd.api+json"
}));

//For the form override to use delete
//============================================
app.use(methodOverride("_method"));

// Set Handlebars as the default templating engine.
//============================================
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
	defaultLayout: "main"
}));
app.set("view engine", "handlebars");


//Static directory
//============================================

//app.use(express.static(process.cwd() + "/front-end"));

//Establish Routes
//============================================

var ideaRoutes = require("./controllers/idea-api-routes.js");
var techRoutes = require("./controllers/tech-api-routes.js");
var userRoutes = require("./controllers/user-api-routes.js");
var projectRoutes = require("./controllers/project-api-routes.js");

app.use("/ideas", ideaRoutes);
app.use("/tech", techRoutes);
app.use("/user", userRoutes);
app.use("/project", projectRoutes);

require("./routes/html-routes.js")(app);

// -------- FRANCIS' PART BELOW --------

// =======================
// get the packages we need ============
// =======================
// var express     = require('express');
// var app         = express();
// var bodyParser  = require('body-parser');
var path = require("path");
var morgan = require('morgan');
// var mongoose    = require('mongoose');

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var db = require('./models'); // get our sequelize model

// var length;

// Sets up the Express app to handle data parsing
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.text());
// app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("./front-end"));

// =======================
// configuration =========
// =======================
// var PORT = process.env.PORT || 8080; // used to create, sign, and verify tokens
// mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// routes ================
// =======================

// create user route
app.get("/", function(request, response){
	response.render("/");
});
app.get('/create', function (request, response) {
	response.sendFile(path.join(__dirname + "/views/create.html"));
});

app.post('/create', function (request, response) {
	db.User.create({
		name: request.body.name,
		password: request.body.password
	}).then(function (dbUser) {
		console.log(dbUser.name.length);
		length = dbUser.name.length;
		// We have access to the new user as an argument inside of the callback function
		response.json(dbUser);
	});
});

// login user route
app.get('/login', function (request, response) {
	response.sendFile(path.join(__dirname + "/views/login.html"));
});


// API ROUTES -------------------

// get an instance of the router for api routes
var apiRoutes = express.Router();

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function (request, response) {
	// find the user
	console.log(request.body.name)
	console.log(request.body.password)

	db.User.findOne({
		where: {
			name: request.body.name,
			password: request.body.password
		}
	}).then(function (dbUser) {

		// if err return console log err
		// if user === null res.json ({message: "user not found or password is incorrect"})
		// console.log(err);
		// req.user.id = decoder;

		console.log(dbUser.dataValues);
		console.log("Success!");

		/*
		var decodeThisObject = {
		    id: user.dataValues.id
		}
		*/

		var token = jwt.sign(dbUser.dataValues, app.get('superSecret'), {
			expiresIn: 60 * 60 // expires in one hour
		});

		// return the information including token as JSON
		// response.json({
		//     success: true,
		//     message: 'Enjoy your token!',
		//     token: token
		// });
		response.redirect('/api/users?token=' + token);
	});
});

// route middleware to verify a token
apiRoutes.use(function (request, response, next) {
	// check header or url parameters or post parameters for token
	var token = request.body.token || request.query.token || request.headers['x-access-token'];

	// decode token
	if (token) {
		console.log("Token: " + token);
		// verifies secret and checks exp
		jwt.verify(token, app.get('superSecret'), function (error, decoded) {
			if (error) {
				return response.json({
					success: false,
					message: 'Failed to authenticate token.'
				});
			} else {
				// if everything is good, save to request for use in other routes
				request.decoded = decoded;
				request.token = token;
				next();
			}
		});
	} else {
		// if there is no token
		// return an error
		return response.status(403).send({
			success: false,
			message: 'No token provided.'
		});
	}
});

// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/', function (request, response) {
response.json({
		message: 'Welcome to the coolest API on earth!'
	});


});

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function (request, response) {
	db.User.findAll({}).then(function (dbUser) {
		response.json(dbUser);
	});
});

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);
/*
// tests
var chai = require("chai");
var sut = function getNameLength(length) {
    if(length >= 6)
        return "success";
    else
        return "name needs to be at least six characters long";
};

var expect = chai.expect;

describe("Login test cases", function() {
    it("should let the user enter their name with a minimum length of 6", function () {
        // Arrange
        var expected = "success"
        var length = 7;

        // Act
        var actual = sut(length);

        // Assert
        expect(actual).equals(expected);
    });
});
*/
// =======================
// start the server ======
// =======================
// Syncing our sequelize models and then starting our express app
// db.sequelize.sync({ force: true }).then(function() {
// app.listen(PORT, function() {
//    console.log("App listening on PORT " + PORT);
//  });
// });
// -------- FRANCIS' PART ENDS --------

//Listener
//============================================
var db = require("./models");

db.sequelize.sync().then(function () {
	app.listen(PORT, function () {
		console.log("Listening on PORT " + PORT);
	});
});
