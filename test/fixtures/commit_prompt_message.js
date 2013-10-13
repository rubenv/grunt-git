'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        gitcommit: {
            task: {
                options: {
                    message: 'PROMPT',
                },
                files: {
                    src: ['test.txt']
                }
            }
        }
    });

    grunt.registerTask('change', 'Generate changes', function () {
        grunt.file.write('test.txt', 'test');
    });

    grunt.loadTasks('../../tasks');
    grunt.registerTask('default', ['change', 'gitcommit']);
};