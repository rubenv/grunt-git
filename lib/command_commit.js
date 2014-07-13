'use strict';

var async = require('grunt').util.async;
var grunt = require('grunt');
var ArgUtil = require('../lib/argUtil.js');

module.exports = function (task, exec, done) {
    var argUtil = new ArgUtil(task, [
        {
            option: 'message',
            defaultValue: 'Commit',
            useAsFlag: true,
            useValue: true,
            flag: '-m'
        },
        {
            option: 'ignoreEmpty',
            defaultValue: false,
            useAsFlag: false,
            useValue: false
        },
        {
            option: 'noVerify',
            defaultValue: false,
            useAsFlag: true,
            useValue: false
        },
        {
            option: 'noStatus',
            defaultValue: false,
            useAsFlag: true,
            useValue: false
        }
    ]);

    var options = argUtil.options;
    var args = ['commit'].concat(argUtil.getArgFlags());

    args.push(done);

    function addFiles(files, cb) {
        async.forEachSeries(files.src, addFile, cb);
    }

    function addFile(file, cb) {
        exec('add', file, cb);
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
