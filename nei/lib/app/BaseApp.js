
var baseApp = ( function (baseSubModule) {
	
	//dependencies
	
	//private properties
	
	function run() {
	}
	
	function tick() {
	}
	
	//public properties
	baseSubModule = {
		run: run,
		tick: tick
	};
	
	module.exports = baseSubModule;
	
	return baseSubModule;
}(baseApp || {}));