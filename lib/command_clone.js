'use strict';

var async = require('grunt').util.async;
var grunt = require('grunt');

module.exports = function (task, exec, done) {
    var options = task.options({
        bare: false,
        branch: false,
        repository: false,
        directory: false
    });
    // repo directory exists
    if(grunt.file.exists(options.directory ? options.directory : task.target)){
        grunt.log.ok(task.target+' exists!');
        return done(); // call next
    }
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
        args.push(options.directory);
    }else{// use task target name
        args.push(task.target);
    }

    // Add callback
    args.push(done);

    exec.apply(this, args);
};

module.exports.description = 'Clone repositories.';
