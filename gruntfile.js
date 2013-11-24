module.exports = function(grunt){
	var scripts = { src: 'modular.js' };

	grunt.initConfig({
		bump: {
			options: {
				files: ['package.json', 'bower.json'],
				commitFiles: ['-a'],
				commitMessage: 'release %VERSION%',
				tagMessage: 'version %VERSION%',
				pushTo: 'origin'
			}
		},
		complexity: {
			target: scripts
		},
		jshint: {
			target: scripts
		},
		uglify: {
			target: {
				src: 'modular.js',
				dest: 'modular.min.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-complexity');
	grunt.loadNpmTasks('grunt-bump');

	grunt.registerTask('default', ['jshint', 'complexity', 'uglify']);
};