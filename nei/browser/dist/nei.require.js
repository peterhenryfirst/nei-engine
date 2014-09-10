require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

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
},{}],"E:\\development\\public\\nei-engine\\nei\\nei.js":[function(require,module,exports){
module.exports=require('FBEGPC');
},{}],"FBEGPC":[function(require,module,exports){
//var minimatch = require('minimatch');

/*
var helper = require('./lib/helper');
var echo = require('./lib/echo');
var optional = require('./lib/optional');

module.exports = {

  add: function(a, b) {
    return a + b;
  },

  mult: function(a, b) {
    return helper.mult(a, b);
  },

  isJs: function(filename) {
    return minimatch(filename, '*.js');
  },

  callCallback: function(cb) {
    return cb(1302);
  },

  echo: function(str) {
    return echo.echo(str);
  },

  useOptional: function() {
    return optional.optional();
  },
};
/**/

var nei = ( function (neiModule) {
	
	//dependencies
	var base = require('./lib/app/BaseApp');
	
	neiModule.BaseApp = base;
	
	console.log('NEI MODULE:');
	
	console.log(neiModule);
	
	module.exports = neiModule;
	
	return neiModule;
}(nei || {}));
},{"./lib/app/BaseApp":1}]},{},["FBEGPC"])