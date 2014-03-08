'use strict';

var async = require('grunt').util.async;
var grunt = require('grunt');

module.exports = function (task, exec, done) {
    var options = task.options({
        remote: 'origin',
        branch: null,
        all: false,
        upstream: false,
        tags: false
    });
    
    var args = ['push', ];
    args.unshift(options.cwd);

    if (options.all) {
        args.push('--all');
    }

    if (options.upstream) {
        args.push('--set-upstream');
    }

    if (options.tags) {
        args.push('--tags');
    }

    args.push(options.remote);

    if (options.branch) {
        args.push(options.branch);
    }

    // Add callback
    args.push(done);

    exec.apply(this, args);
};

module.exports.description = 'Pushes to a remote.';

