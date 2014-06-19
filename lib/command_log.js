'use strict';

var grunt = require('grunt');

var FORMAT_COMMIT_HASH = '%H%n',
    FORMAT_AUTHOR = '%an%n%ae%n',
    FORMAT_DATE = '%aD%n',
    FORMAT_SUBJECT = '%s%n',
    FORMAT_BODY = '%b',
    FORMAT_SEPARATOR = '--grunt-gitlog-commit-separator--';

var logRegexp = /([a-f0-9]+)\n(.+)\n(.+)\n(.+)\n([^\n]+)\n([\s\S]*)?\n?/;

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
    var logs = str.split(FORMAT_SEPARATOR);
    return logs.slice(0, -1).map(parseLog);
}

module.exports = function (task, exec, done) {
    var options = task.options({
        prop: 'gitlog.' + task.target + '.result', // grunt config property in which to store the result

        // by commit
        from: null, // tag or commit hash, etc, default: null
        to: null, // tag or commit hash, (default: null (HEAD if from is not null))

        // by date
        after: null, // date to start on (default: null)
        before: null, // date to end on (default: now)

        merges: false // show merge commits or not (default: false)
    });

    var args = ['log'],
        format = FORMAT_COMMIT_HASH +
                 FORMAT_AUTHOR +
                 FORMAT_DATE +
                 FORMAT_SUBJECT +
                 FORMAT_BODY +
                 FORMAT_SEPARATOR;

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

    args.push('--pretty=format:' + format);

    grunt.util.spawn({
        cmd: 'git',
        args: args
    }, function (err, result) {
        if (err) {
            grunt.fail.fatal('Error running git log');
            return;
        }
        var logs = parseLogs(result.stdout);
        if (options.prop) {
            grunt.config.set(options.prop, logs);
        }
        if (options.callback) {
            options.callback(logs);
        }
        done();
    });
};

module.exports.description = 'Read commit logs from a git repository.';
