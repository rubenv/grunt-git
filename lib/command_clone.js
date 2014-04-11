'use strict';

var async = require('grunt').util.async;
var grunt = require('grunt');
var rimraf = require('rimraf');

module.exports = function (task, exec, done) {
    var options = task.options({
        bare: false,
        branch: false,
        repository: false,
        directory: false,
        overwrite: false
    });

    var args = ['clone'];

    // repo is the sole required option
    if (!options.repository) {
        done(new Error('gitclone tasks requires that you specify a "repository"'));
        return;
    }

    if (options.bare) {
        args.push('--bare');
    }

    if (options.branch && !options.bare) {
        args.push('--branch');
        args.push(options.branch);
    }

    // repo comes after the options
    args.push(options.repository);

    // final argument is checkout directory (optional)
    if (options.directory) {

        if (options.overwrite && grunt.file.isDir(options.directory)) {
            try {
                rimraf.sync(filepath);
            } catch (e) {
                grunt.log.error();
                grunt.fail.warn('Unable to delete "' + options.directory + '" (' + e.message + ').', e);
            }
        }

        args.push(options.directory);
    }

    // Add callback
    args.push(done);

    exec.apply(this, args);
};

module.exports.description = 'Clone repositories.';
