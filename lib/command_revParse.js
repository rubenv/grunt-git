'use strict';

var async = require('grunt').util.async;
var grunt = require('grunt');
var ArgUtil = require('flopmang');

module.exports = function (task, exec, done) {
    var options = task.options({
        prop: 'gitrevParse.' + task.target + '.result'
    });

    var argUtil = new ArgUtil(task, [
        {
            option: 'short',
            useAsFlag: true,
            useValue: false,
            customFlagFn: function (arg) {
                if (arg.value) {
                    return ['--short=' + arg.value];
                }
                return null;
            }
        },
        {
            option: 'abbrevRef',
            defaultValue: false,
            useAsFlag: true,
            useValue: false,
            customFlagFn: function (arg) {
                if (arg.value) {
                    return ['--abbrev-ref'];
                }
                return null;
            }
        },
        {
            option: 'treeIsh',
            defaultValue: 'HEAD',
            useAsFlag: false,
            useValue: true
        }
    ]);

    function next(error, result, code) {
        result = result.toString();

        if (options.prop) {
            grunt.config.set(options.prop, result);
        }

        if (typeof options.callback === 'function') {
            options.callback(result);
        }

        done();
    }

    var args = ['rev-parse'].concat(argUtil.getArgFlags());

    args.push(next);

    exec.apply(this, args);
};

module.exports.description = 'Pick out and massage parameters';