module.exports = function(grunt){
	var scripts = { src: 'modular.js' };

	grunt.initConfig({
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

	grunt.registerTask('default', ['jshint', 'complexity', 'uglify']);
};