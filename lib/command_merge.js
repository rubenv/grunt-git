'use strict';

var grunt = require('grunt');

module.exports = function (task, exec, done) {
    var options = task.options({
        branch: null
    });

    var args = ['merge'];

    if (!options.branch) {
        done(new Error('gitmerge task requires that you specify a "branch" to merge from.'));
        return;
    }

    args.push(options.branch);

    if (options.ffOnly) {
        args.push('--ff-only');
    }

    if (options.squash) {
        args.push('--squash');
    }

    // Add callback
    args.push(done);

    exec.apply(this, args);
};

module.exports.description = 'Merge a git branch.';

