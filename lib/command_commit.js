'use strict';

var async = require('grunt').util.async;

module.exports = function (task, exec, done) {
    var self = this;

    var options = task.options({
        message: 'Commit',
        ignoreEmpty: false,
        all: false
    });

    function addFiles(files, cb) {
        async.forEachSeries(files.src, addFile, cb);
    }

    function addFile(file, cb) {
        var args = ['add', ];

        if (options.all) {
            args.push('--all');
        }

        args.push(file);
        args.push(cb);

        exec.apply(self, args);
    }

    function checkStaged(cb) {
        exec("diff", "--cached", "--exit-code", function (err, result, code) {
            cb(null, code);
        });
    }

    async.forEachSeries(task.files, addFiles, function (err) {
        if (err) {
            return done(err);
        }

        checkStaged(function (err, staged) {
            if (err) {
                return done(err);
            }

            if (!options.ignoreEmpty || staged) {
                exec("commit", "-m", options.message, done);
            } else {
                done();
            }
        });
    });
};

module.exports.description = 'Commit a git repository.';
