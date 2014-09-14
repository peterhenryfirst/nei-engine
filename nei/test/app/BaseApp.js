/*jslint maxlen: 500 */
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('Base App tests', function() {
	
	var base = require('../../lib/app/BaseApp');
	
	beforeEach(function(done) {
		done();
	});
	
	afterEach(function(done) {
		if (base.isInitiated()) {
			base.release();
		}
		done();
	});
	
	it('should exist BaseApp with basic properties', function() {
		should.exist(base);
		base.should.be.an('object');

		expect(base).to.have.property('init').and.to.be.a('function');
		expect(base).to.have.property('release').and.to.be.a('function');
		
		expect(base).to.have.property('isInitiated').and.to.be.a('function');
		expect(base).to.have.property('setOptions').and.to.be.a('function');

	});
	
	it('should throw error when try to initialize twice', function() {
		/*
		var stub = sinon.stub();
		
		base.init = stub;
		
		base.init();
		
		expect(stub).to.have.been.called;
		/**/
		
		var spy = sinon.spy(base, 'init');
		
		base.init();
		
		try {
			base.init();
		} catch (e) {
		}
		
		expect(spy).to.have.been.calledTwice;
		
		spy.getCall(1).should.have.thrown();
		
		spy.restore();
	});
	
	it('should throw error when try to call release before init', function() {
		
		var spy = sinon.spy(base, 'release');
		
		try {
			base.release();
		} catch (e) {
		}
		
		expect(spy).to.have.been.called;
		
		spy.should.have.thrown();
		
		spy.restore();
	});
	
	it('should get false from isInitiated method before any call', function() {
		expect(base.isInitiated()).to.be.false;
	});
	
	it('should get true from isInitiated method after call init', function() {
		var spy = sinon.spy(base, 'init');
		
		base.init();
		
		expect(spy).to.have.been.calledOnce;
		
		spy.restore();
		
		expect(base.isInitiated()).to.be.true;
	});
	
	it('should get false from isInitiated method after call init and release', function() {
		
		var spyRelease = sinon.spy(base, 'release'),
			spyInit = sinon.spy(base, 'init');
		
		base.init();
		
		base.release();
		
		expect(spyRelease).to.have.been.called;
		expect(spyInit).to.have.been.called;
		
		spyRelease.restore();
		spyInit.restore();
		
		expect(base.isInitiated()).to.be.false;
		
	});
	
	it('should throw error when try to call setOptions before init', function() {
		
		var spy = sinon.spy(base, 'setOptions');
		
		try {
			base.setOptions();
		} catch (e) {
		}
		
		expect(spy).to.have.been.called;
		
		spy.should.have.thrown();
		
		spy.restore();
		
	});
	
	it('should exist functions run and tick', function() {
		expect(base).to.have.property('tick').and.to.be.a('function');
		
		expect(base).to.have.property('run').and.to.be.a('function');
	});
	
	it('should exist properties to manage the state machine', function() {

		//expect(base).to.have.property('fsm').and.to.be.a('object');

		//expect(base).to.have.property('releaseAllStates').and.to.be.a('function');
		//expect(base).to.have.property('addState').and.to.be.a('function');
		expect(base).to.have.property('setState').and.to.be.a('function');
		expect(base).to.have.property('changeState').and.to.be.a('function');
		
	});
	
	it('should throw error when try to call setState before init', function() {
		
		var spy = sinon.spy(base, 'setState');
		
		try {
			base.setState();
		} catch (e) {
		}
		
		expect(spy).to.have.been.called;
		
		spy.should.have.thrown();
		
		spy.restore();
	});
	
	it('should throw error when try to call changeState before init',function() {
		
		var spy = sinon.spy(base, 'changeState');
		
		try {
			base.changeState();
		} catch (e) {
		}
		
		expect(spy).to.have.been.called;
		
		spy.should.have.thrown();
		
		spy.restore();
	});
});
