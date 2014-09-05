var base = require('../../lib/app/BaseApp');

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('Base App tests', function() {
	it('should exist BaseApp with basic properties', function() {
		should.exist(base);
		base.should.be.an('object');

		expect(base).to.have.property('init').and.to.be.a('function');
		expect(base).to.have.property('release').and.to.be.a('function');

	});
	
	it('should exist functions run and tick', function() {
		expect(base).to.have.property('tick').and.to.be.a('function');
		
		expect(base).to.have.property('run').and.to.be.a('function');
	});
	
	it('should exist properties to manage the state machine', function() {

		expect(base).to.have.property('fsm').and.to.be.a('object');

		expect(base).to.have.property('releaseAllStates').and.to.be.a('function');
		expect(base).to.have.property('addState').and.to.be.a('function');
		expect(base).to.have.property('setState').and.to.be.a('function');
		expect(base).to.have.property('changeState').and.to.be.a('function');
		
	});
});
