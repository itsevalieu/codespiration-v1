var chai = require("chai");
var sutName = function getNameLength(length) {
	if((length >= 6) && (length < 20))
		return "success";
	else
		return "name needs to be at least six characters and no more than 20 characters long";
};

var sutPassword = function getPasswordLength(length) {
	if((length >= 6) && (length < 20))
		return "success";
	else
		return "password needs to be at least six characters long and no more than 20 characters long";
};

var expect = chai.expect;

describe("Login test cases", function() {
	it("should return 'success' when name length is equal to six characters", function () {
		// Arrange
		var expected = "success"
		var length = 6;

		// Act
		var actual = sutName(length);

		// Assert
		expect(actual).equals(expected);
	});

	it("should return 'success' when name length is greater than six characters", function () {
		// Arrange
		var expected = "success"
		var length = 12;

		// Act
		var actual = sutName(length);

		// Assert
		expect(actual).equals(expected);
	});

	it("should return 'name needs to be at least six characters long' when name length is less than six characters", function () {
		// Arrange
		var expected = "name needs to be at least six characters and no more than 20 characters long"
		var length = 3;

		// Act
		var actual = sutName(length);

		// Assert
		expect(actual).equals(expected);
	});

	it("should return 'name needs to be no more than 20 characters long' when name length is greater than 20 characters", function () {
		// Arrange
		var expected = "name needs to be at least six characters and no more than 20 characters long"
		var length = 20;

		// Act
		var actual = sutName(length);

		// Assert
		expect(actual).equals(expected);
	});

	it("should return 'name needs to be no more than 20 characters long' when name length is greater than 20 characters", function () {
		// Arrange
		var expected = "name needs to be at least six characters and no more than 20 characters long"
		var length = null;

		// Act
		var actual = sutName(length);

		// Assert
		expect(actual).equals(expected);
	});

	it("should return 'success' when password length is greater than or equal to six characters", function () {
		// Arrange
		var expected = "success"
		var length = 6;

		// Act
		var actual = sutPassword(length);

		// Assert
		expect(actual).equals(expected);
	});

	it("should return 'success' when password length is greater than or equal to six characters", function () {
		// Arrange
		var expected = "success"
		var length = 12;

		// Act
		var actual = sutPassword(length);

		// Assert
		expect(actual).equals(expected);
	});

	it("should return 'password needs to be at least six characters long' when password length is less than six characters", function () {
		// Arrange
		var expected = "password needs to be at least six characters long and no more than 20 characters long"
		var length = 3;

		// Act
		var actual = sutPassword(length);

		// Assert
		expect(actual).equals(expected);
	});

	it("should return 'password needs to be at least six characters long' when password length is less than six characters", function () {
		// Arrange
		var expected = "password needs to be at least six characters long and no more than 20 characters long"
		var length = 20;

		// Act
		var actual = sutPassword(length);

		// Assert
		expect(actual).equals(expected);
	});

	it("should return 'password needs to be at least six characters long' when password length is less than six characters", function () {
		// Arrange
		var expected = "password needs to be at least six characters long and no more than 20 characters long"
		var length = null;

		// Act
		var actual = sutPassword(length);

		// Assert
		expect(actual).equals(expected);
	});
});