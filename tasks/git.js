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
            message: 'Commit'
        },
        {
            command: 'push',
            message: ''
        });


        if (options.command === 'commit') {
            var done = this.async();


            var addFile = function (file, cb) {
                grunt.util.spawn({
                    cmd: "git",
                    args: ["add", file.src]
                }, cb);
            };


            grunt.util.async.forEach(this.files, addFile, function (err) {
                grunt.util.spawn({
                    cmd: "git",
                    args: ["commit", "-m", options.message]
                }, function (err) {
                    done(!err);
                });


            });
        } else if (options.command === 'push') {
            var done = this.async();


            grunt.util.spawn({
                    cmd: "git",
                    args: ["push","-all"]
                }, function (err) {
                    done(!err);
            });


        } else {
            grunt.log.error('No or unknown command specified: ' + options.command);
        }
    });

};
