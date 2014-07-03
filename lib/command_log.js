'use strict';

var grunt = require('grunt');

var logRegexp = /([a-f0-9]+)\n(.+)\n(.+)\n(.+)\n([^\n]+)\n([\s\S]*)?\n?/;
var SEPARATOR = '--grunt-gitlog-separator--';
var FORMAT = '%H%n' + // commit hash
        '%an%n%ae%n' + // author and email
        '%aD%n' + // date
        '%s%n' + // subject
        '%b' + // body
        SEPARATOR; // separator

function parseLog(log) {
    var matches = logRegexp.exec(log);
    if (!matches) {
        grunt.fail.warn('Log failed to match exepected pattern:\n' + log);
        return {};
    }
    return {
        hash: matches[1],
        author: {
            name: matches[2],
            email: matches[3]
        },
        date: new Date(matches[4]),
        subject: matches[5],
        body: matches[6]
    };
}

function parseLogs(str) {
    var logs = str.split(SEPARATOR);
    return logs.slice(0, -1).map(parseLog);
}

function formatArgs(options) {
    var args = ['log', '--pretty=format:' + FORMAT];

    if (options.from) {
        options.to = options.to || 'HEAD';
        args.push(options.from + '..' + options.to);
    }

    if (options.before) {
        args.push('--before', new Date(options.before).toISOString());
    }

    if (options.after) {
        args.push('--after', new Date(options.after).toISOString());
    }

    if (options.before || options.after) {
        args.push('--date-order');
    }

    if (!options.merges) {
        args.push('--no-merges');
    }

    if (options.number) {
        args.push('-n', parseInt(options.number, 10));
    }

    return args;
}

module.exports = function (task, exec, done) {
    var options = task.options({
        prop: 'gitlog.' + task.target + '.result',
        merges: false
    });

    function handleResult(err, result) {
        var logs;

        if (err) {
            grunt.fail.fatal('Error running git log');
            return;
        }
        console.log(result);

        logs = parseLogs(result.stdout);

        if (options.prop) {
            grunt.config.set(options.prop, logs);
        }

        if (typeof options.callback === 'function') {
            options.callback(logs);
        }
        done();
    }

    exec.apply(null, formatArgs(options).concat([handleResult]));
};

module.exports.description = 'Read commit logs from a git repository.';

// exposed for tests
module.exports.format = FORMAT;
