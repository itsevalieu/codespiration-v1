var chai = require("chai");
var db   = require('./models'); // get our sequelize model

var sut = function getNameLength(length) {
	db.User.findAll({}).then(function(dbUser) {
	   	if(dbUser[0].dataValues.name.length === length)
    		return "success";
    
    	else
    		return "name needs to be at least six characters long";
    });
};

var expect = chai.expect;

describe("Login test cases", function() {
	it("should let the user enter their name with a minimum length of 6", function () {
		// Arrange
		var expected = "success";
		var length = 6;

		// Act
		var actual = sut(length);

		// Assert
		expect(actual).equals(expected);
	});
});