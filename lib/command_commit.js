'use strict';

var async = require('grunt').util.async;

module.exports = function (task, exec, done) {
    var options = task.options({
        message: 'Commit',
        ignoreEmpty: false
    });

    function addFiles(files, cb) {
        async.forEach(files.src, addFile, cb);
    }

    function addFile(file, cb) {
        exec("add", file, cb);
    }

    function checkStaged(cb) {
        exec("diff", "--cached", "--exit-code", function (err, result, code) {
            cb(null, code);
        });
    }

    async.forEach(task.files, addFiles, function (err) {
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
