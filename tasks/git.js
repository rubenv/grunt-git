/*
 * grunt-git
 * https://github.com/rubenv/grunt-git
 *
 * Copyright (c) 2013 Ruben Vermeersch
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    grunt.registerMultiTask('git', 'Execute git commands.', function () {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            command: 'commit',
            message: 'Commit',
            tag: 'Tag'
        });

        var done;


        switch (options.command) {

            // ---------- Commit ----------

            case 'commit':
                done = this.async();

                var addFile = function (file, callback) {
                    grunt.util.spawn({
                        cmd: 'git',
                        args: ['add', file.src]
                    }, callback);
                };

                grunt.util.async.forEach(this.files, addFile, function (error) {
                    grunt.util.spawn({
                        cmd: 'git',
                        args: ['commit', '-m', options.message]
                    }, function (error, result, code) {

                        if (error) {
                            grunt.log.error(result.stdout);
                            done(false);
                        } else {
                            done();
                        }
                    });
                });
                break;


            // ---------- Tag ----------

            case 'tag':
                done = this.async();

                grunt.util.spawn({
                    cmd: 'git',
                    args: ['tag', '-a', options.tag, '-m', options.message]
                }, function (error, result, code) {

                    if (error) {
                        grunt.log.error(result.stdout);
                        done(false);
                    } else {
                        done();
                    }
                });
                break;


            // Unknown
            default:
                grunt.log.error('No or unknown command specified: ' + options.command);
                break;
        }
    });

};
