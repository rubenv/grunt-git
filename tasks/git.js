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
    function exec(task) {
        var args = Array.prototype.slice.call(arguments);
        var callback = args.pop();

        grunt.util.spawn({
            cmd: 'git',
            args: args,
            opts: task.data.options && task.data.options.stdio ? {stdio: 'inherit'} : {}
        }, function () {
            callback.apply(this, arguments);
        });
    }

    function wrapCommand(fn) {
        return function () {
            var task = this;
            var done = task.async();
            fn(this, function () { exec(task); }, done);
        };
    }

    for (var command in commands) {
        var fn = commands[command];
        grunt.registerMultiTask("git" + command, fn.description || "", wrapCommand(fn));
    }
};
