'use strict';

var async = require('grunt').util.async;
var grunt = require('grunt');
var ArgUtil = require('flopmang');

module.exports = function (task, exec, done) {
    var argUtil = new ArgUtil(task, [
        {
            option: 'force',
            defaultValue: true,
            useAsFlag: true,
            useValue: false,
            flag: '-f'
        },
        {
            option: 'dry',
            defaultValue: false,
            useAsFlag: true,
            useValue: false,
            flag: '-n'
        },
        {
            option: 'quiet',
            defaultValue: false,
            useAsFlag: true,
            useValue: false,
            flag: '-q'
        },
        {
            option: 'exclude',
            defaultValue: false,
            useAsFlag: true,
            useValue: true,
            flag: '-e'
        },
        {
            option: 'onlyignoredfiles',
            defaultValue: false,
            useAsFlag: true,
            useValue: false,
            flag: '-X'
        },
        {
            option: 'nonstandard',
            defaultValue: false,
            useAsFlag: true,
            useValue: false,
            flag: '-x'
        },
        {
            option: 'directories',
            defaultValue: false,
            useAsFlag: true,
            useValue: false,
            flag: '-d'
        },
    ]);

    var args = ['clean'].concat(argUtil.getArgFlags());

    // Add the file paths to the arguments.
    task.files.forEach(function (files) {
        for (var i = 0; i < files.src.length; i++) {
            args.push(files.src[i]);
        }
    });

    // Add callback
    args.push(done);

    exec.apply(this, args);
};

module.exports.description = 'Remove untracked files from the working tree.';
