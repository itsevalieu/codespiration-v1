var db = require("../models");
var express = require("express");
//create the router
var router = express.Router();

router.get("/", function(request, response) {
  db.User.findAll({}).then(function(allUser) {
    var userObj = {
      user: allUser
    };
    response.json(userObj);
    console.log("Find all users working!");
  });
});

module.exports = router;