var mocha = require('mocha'),
	chai = require('chai');

var expect = chai.expect;

describe("A basic test", function() {
   it('should pass when everything is okay', function() { 
   	expect(true).to.be.true; 
   });
});