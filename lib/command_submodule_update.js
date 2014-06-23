'use strict';

var async = require('grunt').util.async;
var grunt = require('grunt');
var _s = require('underscore.string');

module.exports = function (task, exec, done) {
    var optionKey;
    var allowedOptions = {
        init: false,
        remote: false,
        force: false,
        rebase: false,
        merge: false,
        reference: null,
        depth: null,
        recursive: false,
        noFetch: false
    };

    var options = task.options(allowedOptions);

    var args = ['submodule', 'update'];


    // Loop through allowable cli flags in options and add to args
    for (optionKey in allowedOptions) {
        if (options[optionKey] !== undefined && options[optionKey] !== null && options[optionKey] !== false) {
            // Add flag
            args.push('--' + _s.dasherize(optionKey));
            // If not a boolean, add the value after the flag
            if (typeof options[optionKey] !== 'boolean') {
                args.push(options[optionKey]);
            }
        }
    }

    // If a path was specified, add it now:
    if (options.path) {
        args.push(options.path);
    }

    // Add callback
    args.push(done);

    exec.apply(this, args);
};

module.exports.description = 'Update git submodules.';
