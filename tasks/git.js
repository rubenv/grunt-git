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
    function exec() {
        var args = Array.prototype.slice.call(arguments);
        var callback = args.pop();

        grunt.util.spawn({
            cmd: 'git',
            args: args
        }, function () {
            callback.apply(this, arguments);
        });
    }

    function wrapCommand(fn) {
        return function () {
            var done = this.async();
            fn(this, exec, done);
        };
    }

    for (var command in commands) {
        var fn = commands[command];
        grunt.registerMultiTask("git" + command, fn.description || "", wrapCommand(fn));
    }

    /**
     *  options:
     *    - branch : branch to be rebased onto
     *    - theirs : use --strategy=recursive -Xtheirs
     */
    grunt.registerMultiTask('gitrebase', 'Rebase a branch onto another branch.', function () {
        var options = this.options({
            theirs : false
        });

        if (!options.branch) {
            grunt.log.error('gitrebase requires a branch parameter.');
            return;
        }

        var done = this.async();
        var args = ["rebase"];

        if (options.theirs === true) {
            args.push('--strategy=recursive', '-Xtheirs');
        }

        args.push(options.branch);

        grunt.util.spawn({
            cmd: "git",
            args: args
        }, function (err) {
            done(!err);
        });
    });
};
