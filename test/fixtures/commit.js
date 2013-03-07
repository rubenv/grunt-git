'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        git: {
            task: {
                options: {
                    command: 'commit',
                    message: 'Testing'
                },
                files: {
                    src: ['test.txt']
                }
            }
        },
    });

    grunt.registerTask('change', 'Generate changes', function () {
        grunt.file.write('test.txt', 'test');
    });

    grunt.loadTasks('../../tasks');
    grunt.registerTask('default', ['change', 'git']);
};
