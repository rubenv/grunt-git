'use strict';

var async = require('grunt').util.async;
var grunt = require('grunt');
var ArgUtil = require('flopmang');

module.exports = function (task, exec, done) {
    var argUtil = new ArgUtil(task, [
        {
            option: 'mode',
            defaultValue: false,
            useAsFlag: false,
            useValue: true,
            customValueFn: function (arg) {
                if (arg.value) {
                    return ['--' + arg.value];
                }
                return null;
            }
        },
        {
            option: 'commit',
            defaultValue: 'HEAD',
            useAsFlag: false,
            useValue: true
        }
    ]);

    var options = argUtil.options;
    var args = ['reset'].concat(argUtil.getArgFlags());

    if (!options.mode) {
        task.files.forEach(function (files) {
            for (var i = 0; i < files.src.length; i++) {
                args.push(files.src[i]);
            }
        });
    }

    // Add callback
    args.push(done);

    exec.apply(this, args);
};

module.exports.description = 'Reset changes.';
