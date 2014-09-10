
var baseApp = ( function (baseSubModule) {
	
	//dependencies
	
	//private properties
	
	var _initialized = false;
	
	function init() {
		
		if (_initialized) {
			throw new Error('The application was initilized previously');
		}
		_initialized = true;
	}
	
	function release() {
		console.log('RELEASE: ' + _initialized);
		if (!_initialized) {
			console.log('RELEASE2');
			throw new Error('The application was not initilized previously');
		}
		_initialized = false;
	}
	
	function isInitiated() {
		return _initialized;
	}
	
	function run() {
	}
	
	function tick() {
	}
	
	function setState() {
	}
	
	function changeState() {
	}
	
	//public properties
	baseSubModule = {
		
		init: init,
		release: release,
		isInitiated: isInitiated,
		
		run: run,
		tick: tick,
		
		setState: setState,
		changeState: changeState
	};
	
	module.exports = baseSubModule;
	
	return baseSubModule;
}(baseApp || {}));