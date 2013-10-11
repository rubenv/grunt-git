'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        gittag: {
            task: {
                options: {
                    tag: '0.0.1'
                }
            },
            task2: {
                options: {
                    tag: '0.0.1',
                    force: true
                }
            },
            task3: {
                options: {
                    tag: '0.0.1'
                }
            }
        },
    });

    grunt.loadTasks('../../tasks');
    grunt.registerTask('default', ['gittag:task', 'gittag:task2', 'gittag:task3:force']);
};
