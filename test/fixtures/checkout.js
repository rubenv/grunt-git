'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        gitcheckout: {
            task: {
                options: {
                    branch: 'testing',
                    create: true
                }
            }
        },
    });

    grunt.loadTasks('../../tasks');
    grunt.registerTask('default', ['gitcheckout']);
};