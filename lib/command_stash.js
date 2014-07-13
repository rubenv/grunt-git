'use strict';

var async = require('grunt').util.async;
var grunt = require('grunt');
var ArgUtil = require('flopmang');

module.exports = function (task, exec, done) {
    var argUtil = new ArgUtil(task, [
        {
            option: 'command',
            defaultValue: 'save',
            useAsFlag: false,
            useValue: true
        },
        {
            option: 'stash',
            defaultValue: null,
            useAsFlag: false,
            useValue: true,
            customValueFn: function (arg) {
                if (arg.value) {
                    return ['stash@{' + arg.value + '}'];
                }
                return null;
            }
        },
        {
            option: 'staged',
            defaultValue: false,
            useAsFlag: true,
            useValue: false,
            flag: '--index'
        }
    ]);

    var args = ['stash'].concat(argUtil.getArgFlags());

    // Add callback
    args.push(done);

    exec.apply(this, args);
};

module.exports.description = 'Stash and apply code changes.';
