/*
 * grunt-git
 * https://github.com/rubenv/grunt-git
 *
 * Copyright (c) 2013 Ruben Vermeersch
 * Licensed under the MIT license.
 */

'use strict';

var commands = require('../lib/commands');

module.exports = function(grunt) {

    function wrapCommand(fn) {
        return function() {
            var self = this;

            function exec() {
                var args = Array.prototype.slice.call(arguments);
                var callback;
                var options = self.options({
                    verbose: false
                });
                var spawnOpts = {};

                //i can define a callback in my tasks. 
                //  if so, done function is passed as arguments
                //  otherwise is called after the execution of the task
                if (options.callback) {
                    var cb = args.pop();
                    callback = function() {
                        var args = Array.prototype.slice.call(arguments);
                        args = [cb].concat(args);
                        options.callback.apply(this, args);
                    };

                } else {
                    callback = args.pop();
                }

                //build spawn options based on task options
                if (options.cwd) {
                    //verify that the specified cwd exists
                    if (grunt.file.isDir(options.cwd)) {
                        spawnOpts.cwd = options.cwd;
                    } else {
                        throw new Error('The specified cwd does not exist: "' + options.cwd + '"');
                    }
                }
                if (options.verbose) {
                    spawnOpts.stdio = 'inherit';
                }

                grunt.util.spawn({
                    cmd: 'git',
                    args: args,
                    opts: spawnOpts
                }, function() {
                    callback.apply(this, arguments);
                });
            }

            var done = self.async();
            fn(self, exec, done);
        };
    }

    for (var command in commands) {
        var fn = commands[command];
        grunt.registerMultiTask('git' + command, fn.description || '', wrapCommand(fn));
    }
};