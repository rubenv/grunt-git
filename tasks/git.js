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
        grunt.log.error('The git task is deprecated, use gitcommit instead');
    });

    grunt.registerMultiTask('gitcommit', 'Commit a git repository.', function () {
        var options = this.options({
            message: 'Commit'
        });

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
    });

    grunt.registerMultiTask('gittag', 'Create a git tag.', function () {
        var options = this.options({
            message: ''
        });

        if (!options.tag) {
            grunt.log.error('gittag requires a tag parameter.');
            return;
        }

        var done = this.async();

        var args = ["tag"];
        if (options.message && options.message.trim() !== '') {
            args.push("-m");
            args.push(options.message);
        }
        args.push(options.tag);

        grunt.util.spawn({
            cmd: "git",
            args: args
        }, function (err) {
            done(!err);
        });
    });

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

    grunt.registerMultiTask('gitclone', 'Clone repositories.', function () {
        var options = this.options({
                bare: false,
                branch: false,
                repository: false,
                directory: false
            }),
            done = this.async(),
            args = ['clone'];

        if (options.bare) {
            args.push('--bare');
        }

        if (options.branch) {
            args.push('--branch ' + options.branch);
        }

        if (options.repo || options.repository) {
            args.push(options.repo || options.repository);
        }

        if (options.directory) {
            args.push(options.directory);
        }

        grunt.util.spawn({
            cmd: 'git',
            args: args
        }, function (err) {
            done(!err);
        });
    });
};
