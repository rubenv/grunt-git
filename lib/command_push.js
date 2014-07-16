'use strict';

var async = require('grunt').util.async;
var grunt = require('grunt');
var ArgUtil = require('flopmang');

module.exports = function (task, exec, done) {
    var argUtil = new ArgUtil(task, [
        {
            option: 'all',
            defaultValue: false,
            useAsFlag: true,
            useValue: false
        },
        {
            option: 'upstream',
            defaultValue: false,
            useAsFlag: true,
            useValue: false,
            flag: '--set-upstream'
        },
        {
            option: 'tags',
            defaultValue: false,
            useAsFlag: true,
            useValue: false
        },
        {
            option: 'force',
            defaultValue: false,
            useAsFlag: true,
            useValue: false
        },
        {
            option: 'remote',
            defaultValue: 'origin',
            useAsFlag: false,
            useValue: true
        },
        {
            option: 'branch',
            defaultValue: null,
            useAsFlag: false,
            useValue: true
        }
    ]);

    var args = ['push'].concat(argUtil.getArgFlags());

    // Add callback
    args.push(done);

    exec.apply(this, args);
};

module.exports.description = 'Pushes to a remote.';

