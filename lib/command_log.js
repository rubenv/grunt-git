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
    return !!arg.value ? new Date(arg.value).toISOString() : undefined;
}

module.exports = function (task, exec, done) {
    var options = task.options({
        prop: 'gitlog.' + task.target + '.result'
    });

    var argConfigs = [
        {
            option: 'noMerges',
            flag: '--no-merges',
            useAsFlag: true,
            defaultValue: true,
            useValue: false
        },
        {
            option: 'number',
            flag: '-n',
            useAsFlag: true,
            useValue: true
        }
    ];

    if (options.from) {
        argConfigs.push({
            option: 'from',
            useAsFlag: false,
            useValue: true,
            customValueFn: function (arg) {
                return arg.value + '..' + (options.to || 'HEAD');
            }
        });
    }

    if (options.before) {
        argConfigs.push({
            option: 'before',
            useAsFlag: true,
            customValueFn: argToISOString
        });
    }

    if (options.after) {
        argConfigs.push({
            option: 'after',
            useAsFlag: true,
            customValueFn: argToISOString
        });
    }

    // auto-order by date if before/after is used
    if (options.before || options.after) {
        argConfigs.push({
            option: 'date-order',
            flag: '--date-order',
            defaultValue: true
        });
    }

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

    var args = ['log', '--pretty=format:' + FORMAT].concat(argUtil.getArgFlags());
    args.push(handleResult);
    exec.apply(null, args);
};

module.exports.description = 'Read commit logs from a git repository.';

// exposed for tests
module.exports.format = FORMAT;
