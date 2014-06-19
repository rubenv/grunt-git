'use strict';

var async = require('grunt').util.async;
var grunt = require('grunt');

module.exports = function (task, exec, done) {
    var options = task.options({
        commit: 'HEAD',
        directory: process.cwd()
    });

    var args = ['reset'];

    if (options.mode) {
        args.push('--' + options.mode);
    }

    args.push(options.commit);

    if (!options.mode) {
        task.files.forEach(function (files) {
            for (var i = 0; i < files.src.length; i++) {
                args.push(files.src[i]);
            }
        });
    }

    // Add callback
    args.push(done);

    // Run the command in the specified directory
    grunt.file.setBase(options.directory);

    exec.apply(this, args);
};

module.exports.description = 'Reset changes.';
