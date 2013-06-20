'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		gitpush : {
			task : {
				options : {
					remote : 'origin',
					all : true
				}
			}
		},
		gitcommit : {
			task : {
				options : {
					message : 'Testing'
				},
				files : {
					src : ['test.txt']
				}
			}
		}
	});

	grunt.registerTask('change', 'Generate changes', function() {
		grunt.file.write('test.txt', 'test');
	});

	grunt.loadTasks('../../tasks');
	grunt.registerTask('default', ['change', 'gitcommit', 'gitpush']);
};
