'use strict';

var ArgUtil = require('flopmang');

module.exports = function (task, exec, done) {
    var argUtil = new ArgUtil(task, [
        {
            option: 'exitCode',
            defaultValue: false,
            useAsFlag: true,
            useValue: false,
            flag: '--exit-code'
        },
        {
            option: 'cached',
            defaultValue: false,
            useAsFlag: true,
            useValue: false,
            flag: '--cached'
        }
    ]);

    var args = ['diff'].concat(argUtil.getArgFlags());

    // Add callback
    args.push(done);

    exec.apply(this, args);
};

module.exports.description = 'Run a git diff.';
