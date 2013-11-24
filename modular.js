(function(){
	'use strict';
	var cache = {}, alias = {};

	function require(identifier){
		return cache[identifier] || (cache[identifier] = module(identifier));
	}

	function module(path){
		var code = load(path);

		return (/\.json$/.test(path)) ? JSON.parse(code) : compile(code, path);
	}

	function injection(identifier){
		return require(alias[identifier] || identifier);
	}

	function compile(code, path){
		var module = { exports: {}, id: path };

		/* jshint evil:true */
		new Function('require', 'exports', 'module', code)(injection, module.exports, module);

		return module.exports;
	}

	function load(filename){
		var request = new XMLHttpRequest();

		request.open('GET', filename, false);
		request.send();

		return request.response;
	}

	function completePath(path){
		return path.replace(/\/+/g, '/').replace(/(\.\w+$|$)/, function(extension){
			return extension || '.js';
		});
	}

	function setupAliases(map){
		Object.keys(map).forEach(function(identifier){
			alias[identifier] = completePath(map[identifier]);
		});
	}

	function setupScripts(list){
		list.forEach(require);
	}

	function setup(configFile){
		var config = module(configFile);

		setupAliases(config.alias || {});
		setupScripts(config.start || []);
	}

	setup(document.currentScript.dataset.setup);
})();