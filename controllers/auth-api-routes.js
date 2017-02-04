// =======================
// get the packages we need ============
// =======================
var db = require('./models'); 
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var morgan = require('morgan'); 
var config = require('./config'); 

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("./public"));
    
// =======================
// configuration =========
// =======================

app.set('superSecret', config.secret);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

// =======================
// routes ================
// =======================

var apiRoutes = express.Router(); 

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function(request, response) {
    // find the user
    console.log(request.body.name)
    console.log(request.body.password)
    
    db.User.findOne({
        where: {
            name: request.body.name,
            password: request.body.password
        }
    }).then(function(dbUser) {
        console.log(dbUser.dataValues);
        console.log("Success!");

        var token = jwt.sign(dbUser.dataValues, app.get('superSecret'), {
            expiresIn: 60 * 60  // expires in one hour
        });
      
        response.redirect('/api/welcome?token=' + token);
    });
});
        
// route middleware to verify a token
apiRoutes.use(function(request, response, next) {
    // check header or url parameters or post parameters for token
    var token = request.body.token || request.query.token || request.headers['x-access-token'];

    // decode token
    if(token) {
        console.log("Token: " + token);
        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(error, decoded) {      
            if (error) {
                return response.json({ success: false, message: 'Failed to authenticate token.' });    
            } 

            else {
                // if everything is good, save to request for use in other routes
                request.decoded = decoded; 
                request.token = token;   
                next();
            }
        });
    } 

    else {
        // if there is no token
        // return an error
        return response.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });
    }
});

// route to show a random message (GET http://localhost:3000/api/)
apiRoutes.get('/welcome', function(request, response) {
    response.json({ message: 'Welcome to the coolest API on earth!' });
});

// route to return all users (GET http://localhost:3000/api/users)
apiRoutes.get('/users', function(request, response) {
    db.User.findAll({}).then(function(dbUser) {
        response.json(dbUser);
    });
});     