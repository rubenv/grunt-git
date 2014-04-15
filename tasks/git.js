/*
 * grunt-git
 * https://github.com/rubenv/grunt-git
 *
 * Copyright (c) 2013 Ruben Vermeersch
 * Licensed under the MIT license.
 */

'use strict';

var commands = require('../lib/commands');

module.exports = function (grunt) {

    function wrapCommand(fn) {
        return function () {
            var task = this;

            function exec() {
                var args = Array.prototype.slice.call(arguments);
                var callback = args.pop();
                var options = task.options({
                    verbose: false
                });
                grunt.util.spawn({
                    cmd: 'git',
                    args: args,
                    opts: options.verbose ? {stdio: 'inherit'} : {}
                }, function () {
                    callback.apply(this, arguments);
                });
            }

            var done = task.async();
            fn(task, exec, done);
        };
    }

    for (var command in commands) {
        var fn = commands[command];
        grunt.registerMultiTask("git" + command, fn.description || "", wrapCommand(fn));
    }
};
