
var baseApp = ( function (baseSubModule) {
	
	//dependencies
	
	//private properties
	
	//this._initialized = false;
	
	function checkIsInit() {
		
		if (!this._initialized) {
			throw new Error('The application was not initilized previously');
		}
	}
	
	function init() {
		
		if (this._initialized) {
			throw new Error('The application was initilized previously');
		}
		this._initialized = true;
	}
	
	function release() {
		
		this.checkIsInit();
		
		this._initialized = false;
	}
	
	function isInitiated() {
		return this._initialized;
	}
	
	function setOptions() {
		this.checkIsInit();
		
		return this;
	}
	
	function run() {
	}
	
	function tick() {
	}
	
	function setState() {
		this.checkIsInit();
	}
	
	function changeState() {
		this.checkIsInit();
	}
	
	//public properties
	baseSubModule = {
		
		checkIsInit: checkIsInit,
		_initialized: false,
		
		init: init,
		release: release,
		isInitiated: isInitiated,
		setOptions: setOptions,
		
		run: run,
		tick: tick,
		
		setState: setState,
		changeState: changeState
	};
	
	module.exports = baseSubModule;
	
	return baseSubModule;
}(baseApp || {}));