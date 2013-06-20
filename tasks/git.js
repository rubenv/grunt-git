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
            message: 'Tag'
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
    
	grunt.registerMultiTask('gitpush', 'Push to remote.', function() {
		var options = this.options({
			branch : '',
			remote : '',
			all : false,
			tags : false
		});

		var done = this.async();

		var args = ['push'];

		if (options.all) {
			args.push("--all");
		}

		if (options.tags && !options.all) {
			args.push("--tags");
		}

		if (options.remote && options.remote.trim() !== '') {
			args.push(options.remote);
		} else {
			args.push("origin");
		}

		if (options.branch && options.branch.trim() !== '') {
			args.push(options.branch);
		}

		grunt.util.spawn({
			cmd : "git",
			args : args
		}, function(err) {
			done(!err);
		});
	});
};
