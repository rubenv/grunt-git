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
            console.log(args);
            console.log(arguments);
            callback.apply(this, arguments);
        });
    }

    function wrapCommand(fn) {
        return function () {
            var done = this.async();
            fn(this, exec, done);
        };
    }

    grunt.registerMultiTask('git', 'Execute git commands.', function () {
        grunt.log.error('The git task is deprecated, use gitcommit instead');
    });

    for (var command in commands) {
        var fn = commands[command];
        grunt.registerMultiTask("git" + command, fn.description || "", wrapCommand(fn));
    }

    grunt.registerMultiTask('gitcheckout', 'Checkout a git branch.', function () {
        var options = this.options({
        });

        if (!options.branch) {
            grunt.log.error('gitcheckout requires a branch parameter.');
            return;
        }

        var done = this.async();

        var args = ["checkout"];
        if (options.create) {
            args.push("-b");
        }
        args.push(options.branch);

        grunt.util.spawn({
            cmd: "git",
            args: args
        }, function (err) {
            done(!err);
        });
    });

    grunt.registerMultiTask('gitstash', 'Stash and apply code changes', function () {
        var options = this.options({
            command: 'save'
        });

        if (!options.command && !options.create) {
            grunt.log.error('gitstash requires a command parameter.');
            return;
        }

        var done = this.async();

        var args = ["stash"];
        args.push(options.command);
        if (options.stash) {
            args.push("stash@{" + options.stash + "}");
        }
        if (options.staged) {
            args.push("--index");
        }

        grunt.util.spawn({
            cmd: "git",
            args: args
        }, function (err) {
            done(!err);
        });
    });

    grunt.registerMultiTask('gitreset', 'Reset to the branch HEAD', function () {
        var options = this.options({
            commit: 'HEAD'
        });

        var done = this.async();

        var args = ["reset"];
        if (options.mode) {
            args.push("--" + options.mode);
        }
        args.push(options.commit);
        if (!options.mode) {
            this.files.forEach(function (files) {
                for (var i = 0; i < files.src.length; i++) {
                    args.push(files.src[i]);
                }
            });
        }

        grunt.util.spawn({
            cmd: "git",
            args: args
        }, function (err) {
            done(!err);
        });
    });
};
