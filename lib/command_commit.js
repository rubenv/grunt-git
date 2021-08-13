'use strict';

var async = require('grunt').util.async;
var grunt = require('grunt');
var ArgUtil = require('flopmang');

module.exports = function (task, exec, done) {
    var argUtil = new ArgUtil(task, [
        {
            option: 'message',
            defaultValue: 'Commit',
            useAsFlag: true,
            useValue: true,
            flag: '-m'
        },
        {
            option: 'description',
            defaultValue: false,
            useAsFlag: true,
            useValue: true,
            flag: '-m'
        },
        {
            option: 'allowEmpty',
            defaultValue: false,
            useAsFlag: true,
            useValue: false
        },
        {
            option: 'noVerify',
            defaultValue: false,
            useAsFlag: true,
            useValue: false
        },
        {
            option: 'noStatus',
            defaultValue: false,
            useAsFlag: true,
            useValue: false
        }
    ]);

    var options = argUtil.options;
    var args = ['commit'].concat(argUtil.getArgFlags());

    task.data.files.src.forEach(function (file) {
        args.push(file);
    });

    args.push(done);

    exec.apply(this, args);
};

module.exports.description = 'Commit a git repository.';
