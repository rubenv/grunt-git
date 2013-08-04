'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        gitreset: {
            task: {
                options: {
                    mode: 'hard',
                    commit: 'HEAD~1'
                }
            }
        },
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
    grunt.registerTask('default', ['change:test.txt', 'commit:test.txt', 'change:test.json', 'commit:test.json', 'change:test', 'gitreset']);
};
