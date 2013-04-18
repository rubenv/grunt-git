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
        grunt.log.error('The git task is deprecated, use gitcommit instead');
    });

    grunt.registerMultiTask('gitcommit', 'Commit a git repository.', function () {
        var options = this.options({
            message: 'Commit'
        },
        {
            command: 'push',
            message: ''
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
        var logError = function (error, result, code) {
            if (error) {
                grunt.log.error(error.text || result.stdout);
                done(false);
            } else {
                done();
            }
        };

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
                    }, logError);
                });

                break;

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
                    cmd: 'git',
                    args: ['tag', '-a', options.tag, '-m', options.message]
                }, logError);

                break;

    grunt.registerMultiTask('gitstash', 'Stash and apply code changes', function () {
        var options = this.options({
            command: 'save'
        });

        if (!options.command && !options.create) {
            grunt.log.error('gitstash requires a command parameter.');
            return;

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

        // repo is the sole required option, allow shorthand
        if (!options.repository) {
            grunt.log.error('gitclone tasks requires that you specify a "repository"');
        }

        if (options.bare) {
            args.push('--bare');
        }

        if (options.branch && !options.bare) {
            args.push('--branch');
            args.push(options.branch);
        }

        // repo comes after the options
        args.push(options.repo || options.repository);

        // final argument is checkout directory (optional)
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
