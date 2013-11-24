(function(){
	'use strict';
	var cache = {}, alias = {}, link = document.createElement('a');

	function require(identifier){
		return cache[identifier] || (cache[identifier] = module(identifier));
	}

	function module(path){
		var code = load(path);

		// IDEA: use map for assicate extension with compile function
		return (/\.json$/.test(path)) ? JSON.parse(code) : compile(code, path);
	}

	function dir(path){
		return path.replace(/\/[^\/]+$/, '/');
	}

	function resolve(src, dest){
		link.href = dir(src) + dest;

		return link.pathname;
	}

	function injection(path){
		return function(identifier){
			return require(alias[identifier] || resolve(path, extension(identifier)));
		};
	}

	function strict(code, path){
		return ['//@ sourceURL=' + path, '"use strict";', code].join('\n');
	}

	function compile(code, path){
		var module = { exports: {}, id: path };

		/* jshint evil:true */
		new Function('require', 'exports', 'module', strict(code, path))(injection(path), module.exports, module);

		return module.exports;
	}

	function load(filename){
		var request = new XMLHttpRequest();

		request.open('GET', filename, false);
		request.send();

		return request.response;
	}

	function extension(path){
		return path.replace(/\/+/g, '/').replace(/(\.\w+$|$)/, function(extension){
			return extension || '.js';
		});
	}

	function setupAliases(map){
		Object.keys(map).forEach(function(identifier){
			alias[identifier] = extension(map[identifier]);
		});
	}

	function setupScripts(list){
		list.forEach(require);
	}

	function setup(configFile){
		var config = require(configFile);

		setupAliases(config.alias || {});
		setupScripts(config.start || []);
	}

	setup(document.currentScript.dataset.setup);
})();