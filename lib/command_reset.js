'use strict';

var async = require('grunt').util.async;
var grunt = require('grunt');
var ArgUtil = require('flopmang');
var path = require('path');

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
            var i = 0;
            var len = files.src.length;
            var file;
            for (; i < len; i++) {
                file = files.src[i];
                if (options.cwd) {
                    file = path.relative(options.cwd, file);
                }
                args.push(file);
            }
        });
    }

    // Add callback
    args.push(done);

    exec.apply(this, args);
};

module.exports.description = 'Reset changes.';
