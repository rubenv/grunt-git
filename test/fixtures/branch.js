'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        gitbranch: {
            task: {
                options: {
                    branch: 'testing'
                }
            }
        },
    });

    grunt.loadTasks('../../tasks');
    grunt.registerTask('default', ['gitbranch']);
};