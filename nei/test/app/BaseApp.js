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
	
	it('Exist BaseApp with basic properties', function() {
		should.exist(base);
		base.should.be.an('object');

		expect(base).to.have.property('init').and.to.be.a('function');
		expect(base).to.have.property('release').and.to.be.a('function');
		
		expect(base).to.have.property('isInitiated').and.to.be.a('function');
		expect(base).to.have.property('setOptions').and.to.be.a('function');

	});
	
	it('Throw error when try to initialize twice', function() {
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
	
	it('Throw error when try to call release before init', function() {
		
		var spy = sinon.spy(base, 'release');
		
		try {
			base.release();
		} catch (e) {
		}
		
		expect(spy).to.have.been.called;
		
		spy.should.have.thrown();
		
		spy.restore();
	});
	
	it('Get false from isInitiated method before any call', function() {
		expect(base.isInitiated()).to.be.false;
	});
	
	it('Get true from isInitiated method after call init', function() {
		var spy = sinon.spy(base, 'init');
		
		base.init();
		
		expect(spy).to.have.been.calledOnce;
		
		spy.restore();
		
		expect(base.isInitiated()).to.be.true;
	});
	
	it('Get false from isInitiated method after call init and release', function() {
		
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
	
	it.skip('Throw error when try to call setOptions before init', function() {
		
		var spy = sinon.spy(base, 'setOptions');
		
		try {
			base.setOptions();
		} catch (e) {
		}
		
		expect(spy).to.have.been.called;
		
		spy.should.have.thrown();
		
		spy.restore();
		
	});
	
	it('Set fsm options, call method init and call to StateMachine create method', function() {
		var stub = sinon.stub(base.StateMachine, 'create');
		var shouldArgValue = { fsm: {} }, shouldReturnValue = 1;
		
		stub.withArgs(shouldArgValue.fsm).returns(shouldReturnValue);
		
		base.setOptions(shouldArgValue).init();
		
		expect(base.fsm).to.eql(shouldReturnValue);
		
		stub.restore();
	});
	
	it('Exist properties to manage the state machine', function() {

		//expect(base).to.have.property('fsm').and.to.be.a('object');

		//expect(base).to.have.property('releaseAllStates').and.to.be.a('function');
		//expect(base).to.have.property('addState').and.to.be.a('function');
		expect(base).to.have.property('trigger').and.to.be.a('function');
		expect(base).to.have.property('changeState').and.to.be.a('function');
		
	});
	
	it('Throw error when try to call trigger before init', function() {
		
		var spy = sinon.spy(base, 'trigger');
		
		try {
			base.trigger();
		} catch (e) {
		}
		
		expect(spy).to.have.been.called;
		
		spy.should.have.thrown();
		
		spy.restore();
	});

	
	describe('Trigger tests', function() {
		
		var stateMachineStub;
		
		beforeEach(function(done) {
			base.setOptions({
				fsm: {
					events: [
						{ name: 'event',  from: 'none',  to: 'final' }
					]
				}
			}).init();
			done();
		});
		
		afterEach(function(done) {
			if (base.isInitiated()) {
				base.release();
			}
			done();
		});
				
		it('current state has changed', function() {
			
			var newEventName = 'event',
				newState = 'newState',
				oldState = 'none',
				fsmEventStub = sinon.stub(base.fsm, 'event', function () {
					base.fsm.current = newState;
				}),
				fsmCanEventStub = sinon.stub(base.fsm, 'can', function() {
					return true;
				});
			
			base.trigger(newEventName);
			
			expect(fsmEventStub).to.have.been.called;
			expect(fsmEventStub).to.have.been.calledOnce;
			
			expect(fsmCanEventStub).to.have.been.called;
			expect(fsmCanEventStub).to.have.been.calledOnce;
			
			expect(base.fsm.current).to.eql(newState);
			expect(base.fsm.current).to.not.eql(oldState);
			expect(base._oldState).to.eql(oldState);
			
			fsmEventStub.restore();
			fsmCanEventStub.restore();
		});
		
		it('new event that do not fired and do not change state', function() {
			
			var newEventName = 'event',
				newState = 'newState',
				oldState = 'none',
				fsmEventStub = sinon.stub(base.fsm, 'event', function () {
					base.fsm.current = newState;
				}),
				fsmCanEventStub = sinon.stub(base.fsm, 'can', function() {
					return false;
				});
			
			base.trigger(newEventName);
			
			expect(fsmEventStub).not.to.have.been.called;
			expect(fsmCanEventStub).to.have.been.called;
			
			expect(fsmCanEventStub).to.have.been.calledOnce;
			
			expect(base.fsm.current).to.not.eql(newState);
			expect(base.fsm.current).to.eql(oldState);
			expect(base._oldState).to.eql('');
			
			fsmEventStub.restore();
			fsmCanEventStub.restore();
		});
	});
	
	it('Throw error when try to call changeState before init',function() {
		
		var spy = sinon.spy(base, 'changeState');
		
		try {
			base.changeState();
		} catch (e) {
		}
		
		expect(spy).to.have.been.called;
		
		spy.should.have.thrown();
		
		spy.restore();
	});
	
	describe('changeState tests', function() {
		
		var originalStates,
			originalOldState;
		
		beforeEach(function(done) {
			
			base.setOptions({
				fsm: {
					initial: 'second',
					events: [
						{ name: 'event',  from: 'first',  to: 'second' }
					]
				}
			}).init();
			
			originalStates = base.states;
			originalOldState = base._oldState;
			
			base._states = {
				first: {
					activate: function () {},
					deactivate: function () {}
				},
				second: {
					activate: function () {},
					deactivate: function () {}
				}
			};
			done();
		});
		
		afterEach(function(done) {
			
			if (base.isInitiated()) {
				base.release();
			}
			
			base._states = originalStates;
			base._oldState = originalOldState;
			
			done();
		});
		
		it('call to old state deactivate method and call to new state activate method', function() {
			
			var first = 'first',
				second = 'second',
				firstStateStub = sinon.stub(base._states.first, 'deactivate'),
				secondStateStub = sinon.stub(base._states.second, 'activate');
			
			base._oldState = first;
			
			base.changeState();
			
			expect(firstStateStub).to.have.been.called;
			expect(secondStateStub).to.have.been.called;
			
			expect(firstStateStub).to.have.been.calledOnce;
			expect(secondStateStub).to.have.been.calledOnce;
			
			firstStateStub.should.have.been.calledBefore(secondStateStub);
			
			firstStateStub.restore();
			secondStateStub.restore();
		});
	});
	
	it('Exist functions run and tick', function() {
		expect(base).to.have.property('tick').and.to.be.a('function');
		
		expect(base).to.have.property('run').and.to.be.a('function');
	});
	
	describe('tick tests', function() {
		
		var originalStates,
			originalOldState;
		
		beforeEach(function(done) {
			
			originalStates = base.states;
			originalOldState = base._oldState;
			
			base._states = {
				first: {
					tick: function () {}
				}
			};
			done();
		});
		
		afterEach(function(done) {
			
			if (base.isInitiated()) {
				base.release();
			}
			
			base._states = originalStates;
			base._oldState = originalOldState;
			
			done();
		});
		
		it('call to current state tick method', function() {
			
			var firstStateStub = sinon.stub(base._states.first, 'tick');
			
			base.setOptions({
				fsm: {
					initial: 'first',
					events: [
						{ name: 'event',  from: 'first',  to: 'second' }
					]
				}
			}).init();
			
			base.tick();
			
			expect(firstStateStub).to.have.been.called;
			
			expect(firstStateStub).to.have.been.calledOnce;
			
			firstStateStub.restore();
		});
		
		it('do not call to current state tick method if current state do not match with states collection', function() {
			
			var firstStateStub = sinon.stub(base._states.first, 'tick');
			
			base.setOptions({
				fsm: {
					initial: 'second',
					events: [
						{ name: 'event',  from: 'first',  to: 'second' }
					]
				}
			}).init();
			
			base.tick();
			
			expect(firstStateStub).not.to.have.been.called;
			
			firstStateStub.restore();
		});
	});
	
});
