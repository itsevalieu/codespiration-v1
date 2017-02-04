//Dependencies
//============================================
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var jwt = require('jsonwebtoken'); //
var config = require('./config'); // 

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
app.use(express.static(process.cwd() + "/front-end"));

app.set('superSecret', config.secret);

//Establish Routes
//============================================

var ideaRoutes = require("./controllers/idea-api-routes.js");
var techRoutes = require("./controllers/tech-api-routes.js");
var userRoutes = require("./controllers/user-api-routes.js");
var projectRoutes = require("./controllers/project-api-routes.js");
var authRoutes = express.Router(); 

app.use("/ideas", ideaRoutes);
app.use("/tech", techRoutes);
app.use("/user", userRoutes);
app.use("/project", projectRoutes);
app.use("/auth", authRoutes);

require("./routes/html-routes.js")(app);

authRoutes.post('/authenticate', function(request, response) {
    console.log(request.body.name)
    console.log(request.body.password)
    
    db.User.findOne({
        where: {
            name: request.body.name,
            password: request.body.password
        }
    }).then(function(dbUser) {
        var token = jwt.sign(dbUser.dataValues, app.get('superSecret'), {
            expiresIn: 60 * 60 
        });
      
        response.redirect('/auth/welcome?token=' + token);
    });
});
        
authRoutes.use(function(request, response, next) {
    var token = request.body.token || request.query.token || request.headers['x-access-token'];

    if(token) {
        jwt.verify(token, app.get('superSecret'), function(error, decoded) {      
            if (error) {
                return response.json({ success: false, message: 'Failed to authenticate token.' });    
            } 

            else {
                request.decoded = decoded; 
                request.token = token;   
                next();
            }
        });
    } 

    else {
        return response.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });
    }
});

authRoutes.get('/welcome', function(request, response) {
    response.json({ message: 'Welcome!!!' });
});

authRoutes.get('/users', function(request, response) {
    db.User.findAll({}).then(function(dbUser) {
        response.json(dbUser);
    });
});     

//Listener
//============================================
var db = require("./models");

db.sequelize.sync().then(function () {
	app.listen(PORT, function () {
		console.log("Listening on PORT " + PORT);
	});
});
