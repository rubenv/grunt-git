'use strict';

var async = require('grunt').util.async;
var grunt = require('grunt');
var ArgUtil = require('flopmang');

module.exports = function (task, exec, done) {
    var argUtil = new ArgUtil(task, [
        {
            option: 'bare',
            defaultValue: false,
            useAsFlag: true,
            useValue: false
        },
        {
            option: 'recursive',
            defaultValue: false,
            useAsFlag: true,
            useValue: false
        },
        {
            option: 'branch',
            defaultValue: false,
            useAsFlag: true,
            useValue: true
        },
        {
            option: 'depth',
            defaultValue: null,
            useAsFlag: true,
            useValue: true
        },
        {
            option: 'repository',
            defaultValue: null,
            useAsFlag: false,
            useValue: true,
            required: true
        },
        {
            option: 'directory',
            defaultValue: null,
            useAsFlag: false,
            useValue: true
        }
    ]);

    var args = ['clone'].concat(argUtil.getArgFlags());

    // Add callback
    args.push(done);

    exec.apply(this, args);
};

module.exports.description = 'Clone repositories.';
