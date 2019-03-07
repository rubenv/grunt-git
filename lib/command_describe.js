'use strict';

var async = require('grunt').util.async;
var grunt = require('grunt');
var ArgUtil = require('flopmang');

module.exports = function (task, exec, done) {
    var options = task.options({
    });
    var argUtil = new ArgUtil(task, [
        {
            option: 'all',
            defaultValue: false,
            useAsFlag: true,
            useValue: false,
            useDasherize: true
        },
        {
            option: 'tags',
            defaultValue: false,
            useAsFlag: true,
            useValue: false,
            useDasherize: true
        },
        {
            option: 'contains',
            defaultValue: false,
            useAsFlag: true,
            useValue: false,
            useDasherize: true
        },
        {
            option: 'abbrev',
            defaultValue: 7,
            useAsFlag: true,
            useValue: false,
            useDasherize: true,
            customFlagFn: function (arg) {
                if (arg.value !== undefined) {
                    return (arg.useDasherize ? '--' : '') + arg.option + '=' + arg.value;
                }
                return null;
            }
        },
        {
            option: 'candidates',
            defaultValue: 10,
            useAsFlag: true,
            useValue: false,
            useDasherize: true,
            customFlagFn: function (arg) {
                if (arg.value !== undefined) {
                    return (arg.useDasherize ? '--' : '') + arg.option + '=' + arg.value;
                }
                return null;
            }
        },
        {
            option: 'commit-ish',
            defaultValue: 'HEAD',
            useAsFlag: false,
            useValue: true,
            required: false
        }
    ]);

    function handleResult(err, result) {
        if (err) {
            grunt.fail.fatal('Error running git describe');
            return;
        }

        if (typeof options.callback === 'function') {
            options.callback(result.stdout);
        }
        done();
    }


    var args = ['describe'].concat(argUtil.getArgFlags());
    args.push(handleResult);
    exec.apply(null, args);
};

module.exports.description = 'Give an object a human readable name based on an available ref.';

