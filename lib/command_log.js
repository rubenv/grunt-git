'use strict';

var grunt = require('grunt');
var ArgUtil = require('flopmang');

var SEPARATOR = '--grunt-gitlog-separator--';
var FORMAT =
    '{%n' +
    '  "hash": "%H",%n' + // commit hash
    '  "author": {%n' +
    '    "name": "%an",%n' + // author
    '    "email": "%ae"%n' + // email
    '  },%n' +
    '  "date": "%aD",%n' + // date
    '  "subject": "%s",%n' + // subject
    '  "body": "%b"%n' + // body
    '}%n' +
    SEPARATOR; // separator

function parseLog(log) {
    try {
        return JSON.parse(log);
    } catch (e) {
        grunt.fail.warn('Log failed to match exepected pattern:\n' + log);
        return {};
    }
}

function parseLogs(str) {
    var logs = str.split(SEPARATOR);
    return logs.slice(0, -1).map(parseLog);
}

function argToISOString(arg) {
    return !!arg.value ? new Date(arg.value).toISOString() : null;
}

module.exports = function (task, exec, done) {
    var options = task.options({
        prop: 'gitlog.' + task.target + '.result'
    });

    var argConfigs = [
        {
            option: 'pretty',
            useAsFlag: false,
            useValue: true,
            defaultValue: 'format:' + FORMAT,
            customValueFn: function (arg) {
                if (arg.value) {
                    return '--' + arg.option + '=' + arg.value;
                }
                return null;
            }
        },
        {
            option: 'noMerges',
            useAsFlag: true,
            defaultValue: true,
            useValue: false
        },
        {
            option: 'number',
            flag: '-n',
            useAsFlag: true,
            useValue: true
        },
        {
            option: 'before',
            useAsFlag: true,
            defaultValue: false,
            customValueFn: argToISOString
        },
        {
            option: 'after',
            useAsFlag: true,
            defaultValue: false,
            customValueFn: argToISOString
        },
        {
            option: 'from',
            useAsFlag: false,
            customValueFn: function (arg) {
                if (arg.value) {
                    return arg.value + '..' + (options.to || 'HEAD');
                } else {
                    return null;
                }
            }
        },
        {
            option: 'dateOrder',
            useAsFlag: true,
            useValue: false,
            defaultValue: false,
            customFlagFn: function (arg) {
                if (arg.value || options.before || options.after) {
                    return '--date-order';
                }
                return null;
            }
        }
    ];

    var argUtil = new ArgUtil(task, argConfigs);

    function handleResult(err, result) {
        var logs;

        if (err) {
            grunt.fail.fatal('Error running git log');
            return;
        }

        logs = parseLogs(result.stdout);

        if (options.prop) {
            grunt.config.set(options.prop, logs);
        }

        if (typeof options.callback === 'function') {
            options.callback(logs);
        }
        done();
    }

    var args = ['log'].concat(argUtil.getArgFlags());
    args.push(handleResult);
    exec.apply(null, args);
};

module.exports.description = 'Read commit logs from a git repository.';

// exposed for tests
module.exports.format = FORMAT;
