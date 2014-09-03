var nei = require('../nei');

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('My browserified tests', function() {

	it('should have mocha super-powers', function() {
		if (false) {
			throw new Error('false is true, I have no clue');
		}
	});

	it('should exist my module', function() {
		should.exist(nei);
		nei.should.be.an('object');
	});

	it('should use chai coz it\'s so tasty', function() {
		//expect(nei.add(2, 3)).to.equal(5);
		//expect(nei.mult(6, 7)).to.equal(42);
	});
});
