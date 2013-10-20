(function(){
	'use strict';
	var aliases = {}, modules = {},
		resolveElement = document.createElement('a');

	// Entry point of script
	config(document.currentScript.getAttribute('data-config'));

	// Set alias list and run initial scripts
	function config(configFile){
		var options = JSON.parse(load(configFile));

		setupAliases(options.alias);
		runInitialScripts(options.start);
	}

	// Get full path for all alises and add it to list
	function setupAliases(list){
		var keys = Object.keys(list), key;

		while(keys.length){
			key = keys.shift();
			aliases[key] = fullPath(list[key]);
		}
	}

	// Run initial scripts like modules
	function runInitialScripts(scripts){
		var script;

		while(scripts.length){
			script = scripts.shift();
			require(fullPath(script));
		}
	}

	// Memoization function for modules
	function require(path){
		return modules[path] || (modules[path] = module(path));
	}

	// Create new module for path
	function module(path){
		var code = load(path);

		return (/\.json$/.test(path)) ? JSON.parse(code) : compile(code, path);
	}

	// Compile code in closure
	function compile(code, path){
		var module = { exports: {}, id: path }, compiler;

		/* jshint evil: true */
		compiler = new Function('require', 'exports', 'module', strictCode(code, path));
		compiler(moduleRequire(path), module.exports, module);

		return module.exports;
	}

	// Require function with relative path
	function moduleRequire(path){
		return function(identifier){
			return require(aliases[identifier] || resolve(path, identifier));
		};
	}

	// Wrap codebase in strict mode and add url for better debugging
	function strictCode(codebase, path){
		return [
			'//@ sourceURL=' + path,
			'"use strict";',
			codebase
		].join('\n');
	}

	function fullPath(path){
		resolveElement.href = extension(path);

		return resolveElement.pathname;
	}

	function resolve(src, dest){
		resolveElement.href = src.replace(/\/[^\/]+$/, '/') + extension(dest);

		return resolveElement.pathname;
	}

	function extension(path){
		return path.replace(/(\.\w+$|$)/, function(extension){
			return extension || '.js';
		});
	}

	// Simple sync HTTP request
	function load(path){
		var request = new XMLHttpRequest();

		request.open('GET', path, false);
		request.send();

		return request.responseText;
	}
})();