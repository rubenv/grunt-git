'use strict';

var async = require('grunt').util.async;
var grunt = require('grunt');
var ArgUtil = require('flopmang');

module.exports = function (task, exec, done) {
    var argUtil = new ArgUtil(task, [
        {
            option: 'create',
            defaultValue: false,
            useAsFlag: true,
            useValue: false,
            flag: '-b'
        },
        {
            option: 'overwrite',
            defaultValue: false,
            useAsFlag: true,
            useValue: false,
            flag: '-B'
        },
        {
            option: 'branch',
            defaultValue: undefined,
            useAsFlag: false,
            useValue: true,
            required: true
        },
        {
            option: 'force',
            defaultValue: false,
            useAsFlag: true,
            useValue: false,
            flag: '-f'
        }
    ]);

    var args = ['checkout'].concat(argUtil.getArgFlags());

    // Add callback
    args.push(done);

    exec.apply(this, args);
};

module.exports.description = 'Checkout a git branch.';

