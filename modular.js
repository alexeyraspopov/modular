(function(cache, alias){
	'use strict';
	function require(id){
		return cache[id] || (cache[id] = module(id));
	}

	function module(path){
		var code = load(path);

		// IDEA: use map for associate extension with compile function
		return (/\.json$/.test(path)) ? JSON.parse(code) : compile(code, path);
	}

	function resolve(src, dest){
		if(dest.charAt(0) === '/'){
			return resolve(location.pathname, dest.slice(1));
		}

		return resolveTerms(src.split(/\/+/).slice(0, -1), dest.split(/\/+/));
	}

	// TODO: use reduce or filter method for better code quality
	function resolveTerms(src, dest){
		var name = dest.pop();

		dest.filter(function(term){
			return term !== '.';
		}).forEach(function(term){
			if(term === '..'){
				src.pop();
			}else{
				src.push(term);
			}
		});

		src.push(name);

		return src.join('/');
	}

	function fullPath(id, basePath){
		return alias[id] || resolve(basePath || location.pathname, extension(id));
	}

	function injection(path){
		return function(id){
			return require(fullPath(id, path));
		};
	}

	function strict(code, path){
		return ['//@ sourceURL=' + path, '"use strict";', code].join('\n');
	}

	function compile(code, path){
		var module = { exports: {}, id: path };

		/* jshint evil:true */
		new Function('require', 'exports', 'module', strict(code, path))(injection(path), module.exports, module);

		return Object.freeze(module.exports);
	}

	function load(filename){
		var request = new XMLHttpRequest();

		request.open('GET', filename, false);
		request.send();

		return request.response;
	}

	function extension(path){
		return path.replace(/(\.\w+$|$)/, function(extension){
			return extension || '.js';
		});
	}

	function setupAliases(map){
		Object.keys(map).forEach(function(id){
			alias[id] = resolve(location.pathname, extension(map[id]));
		});
	}

	function setupScripts(list){
		list.forEach(injection());
	}

	function setup(configFile){
		var config = require(fullPath(configFile));

		setupAliases(config.alias || {});
		setupScripts(config.start || []);
	}

	setup(document.querySelector('script[data-setup]').dataset.setup);

	window.require = injection();
})({}, {});