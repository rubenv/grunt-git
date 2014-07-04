'use strict';

var async = require('grunt').util.async;

module.exports = function (task, exec, done) {
    var options = task.options({
        message: 'Commit',
        ignoreEmpty: false,
        noVerify: false,
        noStatus: false,
        force: false
    });
    var args = ['commit', '-m', options.message];

    if (options.noVerify) {
        args.push('--no-verify');
    }

    if (options.noStatus) {
        args.push('--no-status');
    }

    args.push(done);

    var argsAdd = ['add'];
    if (options.force) {
        argsAdd.push('--force');
    }

    function addFiles(files, cb) {
        async.forEachSeries(files.src, addFile, cb);
    }

    function addFile(file, cb) {

        var localArgs =  argsAdd.slice(0);
        argsAdd.push(file);
        argsAdd.push(cb);
        exec.apply(null, argsAdd);
    }

    function checkStaged(cb) {
        exec('diff', '--cached', '--exit-code', function (err, result, code) {
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
                exec.apply(null, args);
            } else {
                done();
            }
        });
    });
};

module.exports.description = 'Commit a git repository.';
