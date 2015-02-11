'use strict';

var async = require('grunt').util.async;
var grunt = require('grunt');
var ArgUtil = require('flopmang');

module.exports = function (task, exec, done) {
    var argUtil = new ArgUtil(task, [
        {
            option: 'force',
            defaultValue: false,
            useAsFlag: true,
            useValue: false,
            flag: '-f'
        },
        {
            option: 'recurse',
            defaultValue: false,
            useAsFlag: true,
            useValue: false,
            flag: '-r'
        }
    ]);

    var options = argUtil.options;
    var args = ['rm'].concat(argUtil.getArgFlags());

    task.files.forEach(function (files) {
        for (var i = 0; i < files.src.length; i++) {
            args.push(files.src[i]);
        }
    });

    args.push(done);

    exec.apply(this, args);
};

module.exports.description = 'Remove files from the working tree and the index.';
