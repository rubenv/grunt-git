'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        gittag: {
            task: {
                options: {
                    tag: '0.0.1'
                }
            }
        },
    });

    grunt.loadTasks('../../tasks');
    grunt.registerTask('default', ['gittag']);
};
