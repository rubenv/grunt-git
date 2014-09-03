'use strict';

var grunt = require('grunt');
var ArgUtil = require('flopmang');

module.exports = function (task, exec, done) {
    var argUtil = new ArgUtil(task, [
        {
            option: 'repository',
            defaultValue: null,
            useAsFlag: false,
            useValue: true
        },
        {
            option: 'all'
        },
        {
            option: 'append'
        },
        {
            option: 'prune'
        },
        {
            option: 'notags',
            flag: '--no-tags'
        },
        {
            option: 'tags'
        }
    ]);

    var args = ['fetch'].concat(argUtil.getArgFlags());

    // Add callback
    args.push(done);

    exec.apply(this, args);
};

module.exports.description = 'Download objects and refs from a repo.';

