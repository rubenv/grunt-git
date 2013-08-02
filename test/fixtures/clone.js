'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        gitclone: {
            clone: {
                options: {
                    repo: 'https://github.com/mattacular/gitclone-test.git'
                }
            }
        },
    });

    grunt.loadTasks('../../tasks');
    grunt.registerTask('default', ['gitclone']);
};