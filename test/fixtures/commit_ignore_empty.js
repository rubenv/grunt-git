'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        gitcommit: {
            task: {
                options: {
                    message: 'Testing',
                    ignoreEmpty: true
                },
                files: {
                    src: ['test.txt']
                }
            }
        }
    });

    grunt.registerTask('change', 'Generate changes', function (name) {
        grunt.file.write(name, 'test');
    });

    grunt.registerTask('commit', 'Commits the changed file', function (file) {
        var addFile = function (file, cb) {
            grunt.util.spawn({
                cmd: "git",
                args: ["add", file]
            }, function (err, res, code) {
                grunt.util.spawn({
                    cmd: "git",
                    args: ["commit", "-m", 'Test']
                }, function (err) {
                    cb(!err);
                });
            });
        };

        var cb = this.async();

        addFile(file, cb);
    });

    grunt.loadTasks('../../tasks');
    grunt.registerTask('default', ['change:test.txt', 'commit:test.txt', 'gitcommit']);
};