'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        gitclone: {
            clone: {
                options: {
                    repo: 'https://github.com/rubenv/gitclone-test.git'
                }
            },
            branch: {
                options: {
                    repo: 'https://github.com/rubenv/gitclone-test.git',
                    branch: 'test',
                    directory: 'gitclone-branch'
                }
            }
        },
    });

    grunt.loadTasks('../../tasks');
    grunt.registerTask('default', ['gitclone']);
};
