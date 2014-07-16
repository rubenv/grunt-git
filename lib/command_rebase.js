'use strict';

var async = require('grunt').util.async;
var grunt = require('grunt');
var ArgUtil = require('flopmang');

module.exports = function (task, exec, done) {
    var argUtil = new ArgUtil(task, [
        {
            option: 'theirs',
            defaultValue: false,
            useAsFlag: true,
            useValue: false,
            customFlagFn: function (arg) {
                if (arg.value) {
                    return ['--strategy=recursive', '-Xtheirs'];
                }
                return null;
            }
        },
        {
            option: 'branch',
            defaultValue: null,
            useAsFlag: false,
            useValue: true,
            required: true
        }
    ]);

    var args = ['rebase'].concat(argUtil.getArgFlags());

    // Add callback
    args.push(done);

    exec.apply(this, args);
};

module.exports.description = 'Rebase a branch onto another branch.';

