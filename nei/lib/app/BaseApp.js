
var baseApp = ( function (baseSubModule) {
	
	//dependencies
	
	var StateMachine = require('javascript-state-machine');
	
	//private properties
	
	var defaultOptions = {};
	
	function checkIsInit() {
		
		if (!this._initialized) {
			throw new Error('The application was not initilized previously');
		}
	}
	
	function init() {
		
		if (this._initialized) {
			throw new Error('The application was initilized previously');
		}
		
		this.fsm = StateMachine.create(this.options ? this.options.fsm : {});
		
		this._initialized = true;
		this._oldState = '';
	}
	
	function release() {
		
		this.checkIsInit();
		
		this._initialized = false;
	}
	
	function isInitiated() {
		return this._initialized;
	}
	
	function setOptions(opt) {
		//this.checkIsInit();
		this.options = opt || defaultOptions;
		
		return this;
	}
	
	function run() {
	}
	
	function tick() {
		if (this._states[this.fsm.current]) {
			this._states[this.fsm.current].tick();
		}
	}
	
	function trigger(newEventName) {
		this.checkIsInit();
		
		if (this.fsm.can(newEventName)) {
			this._oldState = this.fsm.current;
			this.fsm[newEventName]();
		}
	}
	
	function changeState() {
		this.checkIsInit();
		
		this._states[this._oldState].deactivate();
		
		this._states[this.fsm.current].activate();
	}
	
	//public properties
	baseSubModule = {
		
		checkIsInit: checkIsInit,
		_initialized: false,
		_oldState: '',
		_states: {},
		
		init: init,
		release: release,
		isInitiated: isInitiated,
		setOptions: setOptions,
		
		run: run,
		tick: tick,
		
		StateMachine: StateMachine,
		
		trigger: trigger,
		changeState: changeState
	};
	
	module.exports = baseSubModule;
	
	return baseSubModule;
}(baseApp || {}));