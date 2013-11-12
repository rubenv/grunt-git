'use strict';

/**
 * rebase onto master
 */
module.exports = function (grunt) {
    grunt.initConfig({
        gitrebase: {
            task: {
                options: {
                    branch: 'master'
                }
            }
        },
    });

    grunt.loadTasks('../../tasks');
    grunt.registerTask('default', ['gitrebase']);
};
