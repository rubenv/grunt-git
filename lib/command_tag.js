'use strict';

var async = require('grunt').util.async;
var grunt = require('grunt');
var ArgUtil = require('flopmang');

module.exports = function (task, exec, done) {
    var argUtil = new ArgUtil(task, [
        {
            option: 'remove',
            defaultValue: false,
            useAsFlag: true,
            useValue: false,
            flag: '-d'
        },
        {
            option: 'message',
            defaultValue: '',
            useAsFlag: true,
            useValue: true,
            flag: '-m'
        },
        {
            option: 'annotated',
            defaultValue: false,
            useAsFlag: true,
            useValue: false,
            flag: '-a'
        },
        {
            option: 'force',
            defaultValue: false,
            useAsFlag: true,
            useValue: false
        },
        {
            option: 'tag',
            defaultValue: null,
            useAsFlag: false,
            useValue: true,
            required: true
        }
    ]);

    var args = ['tag'].concat(argUtil.getArgFlags());

    // Add callback
    args.push(done);

    exec.apply(this, args);
};

module.exports.description = 'Create a git tag.';

