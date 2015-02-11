'use strict';

var grunt = require('grunt');
var ArgUtil = require('flopmang');

module.exports = function (task, exec, done) {
    var argUtil = new ArgUtil(task, [
        {
            option: 'branch',
            defaultValue: null,
            useAsFlag: false,
            useValue: true,
            required: true
        },
        {
            option: 'ffOnly',
            defaultValue: false,
            useAsFlag: true,
            useValue: false
        },
        {
            option: 'squash',
            defaultValue: false,
            useAsFlag: true,
            useValue: false
        },
        {
            option: 'noff',
            defaultValue: false,
            useAsFlag: true,
            useValue: false,
            flag: '--no-ff'
        },
        {
            option: 'edit',
            defaultValue: false,
            useAsFlag: true,
            useValue: false
        },
        {
            option: 'noEdit',
            defaultValue: false,
            useAsFlag: true,
            useValue: false
        },
        {
            option: 'message',
            defaultValue: null,
            useAsFlag: true,
            useValue: true,
            flag: '-m'
        },
        {
            option: 'commit',
            defaultValue: false,
            useAsFlag: true,
            useValue: false
        },
        {
            option: 'noCommit',
            defaultValue: false,
            useAsFlag: true,
            useValue: false
        },
        {
            option: 'strategy',
            defaultValue: null,
            useAsFlag: true,
            useValue: true,
            flag: '-s'
        },
        {
            option: 'strategyOption',
            defaultValue: null,
            useValue: true,
            useAsFlag: false,
            customValueFn: function (arg) {
                if (arg.value) {
                    return '-X' + arg.value;
                }
                return null;
            }
        }
    ]);

    var args = ['merge'].concat(argUtil.getArgFlags());

    // Add callback
    args.push(done);

    exec.apply(this, args);
};

module.exports.description = 'Merge a git branch.';
