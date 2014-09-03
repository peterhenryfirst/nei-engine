var base = require('../../lib/app/BaseApp');

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('Base App tests', function() {
	it('should exist BaseApp', function() {
		should.exist(base);
		base.should.be.an('object');
	});
	
	it('should exist functions run and tick', function() {
		expect(base).to.have.property('tick').and.to.be.a('function');
		
		expect(base).to.have.property('run').and.to.be.a('function');
	});
	
	it('should exist properties to manage the state machine', function() {
		should.exist(base);
		base.should.be.an('object');
	});
});
