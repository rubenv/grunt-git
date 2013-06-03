/*
 * grunt-git
 * https://github.com/rubenv/grunt-git
 *
 * Copyright (c) 2013 Ruben Vermeersch
 * Licensed under the MIT license.
 */


module.exports = function (grunt) {
    'use strict';

    grunt.registerMultiTask('git', 'Execute git commands.', function () {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            command: 'commit',
            message: 'Commit'
        },
        {
            command: 'push',
            message: ''
        },
        {
            command: 'tag',
            message: 'Tag',
            tag: 'Tag'
        });

        var done;

        var logError = function (error, result, code) {
            if (error) {
                grunt.log.error(error.text || result.stdout);
                done(false);
            } else {
                done();
            }
        };
        
        if (options.command === 'commit') {
            done = this.async();
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
            }, logError);
        } else if (options.command === 'push') {
            done = this.async();
            
            grunt.util.spawn({
                cmd: "git",
                args: ["push", "--all"]
            }, function (err) {
                done(!err);
            }, logError);
        } else if (options.command === 'tag') {
            done = this.async();
            
            grunt.util.spawn({
                cmd: 'git',
                args: ['tag', '-a', options.tag, '-m', options.message]
            }, logError);
        } else {
            grunt.log.error('No or unknown command specified: ' + options.command);
        }
    });

};
