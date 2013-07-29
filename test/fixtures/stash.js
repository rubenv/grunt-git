'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        gitstash: {
            stash: {
                options: {
                    create: true
                }
            },
            apply: {
                options: {
                    command: 'apply',
                    staged: true,
                    stash: '0'
                }
            }
        },
    });

    grunt.registerTask('change', 'Generate changes', function () {
        grunt.file.write('test.txt', 'test');
    });

    grunt.registerTask('stage', 'Stages the changed file', function () {
        var addFile = function (file, cb) {
            grunt.util.spawn({
                cmd: "git",
                args: ["add", file]
            }, function (err, res, code) { cb(); });
        };

        var cb = this.async();

        addFile('test.txt', cb);
    });

    grunt.loadTasks('../../tasks');
    grunt.registerTask('default', ['change', 'stage', 'gitstash']);
};