'use strict';

var fs = require('fs');
var grunt = require('grunt');
var assert = require('assert');
var common = require('./common');
var child_process = require('child_process');

describe('stash', function () {
    var repo = null;
    var stashexists = null;

    before(function (done) {
        var fetchbranch = function (repo, cb) {
            fs.exists(repo.path + '/.git/refs/stash', function (e) {
                stashexists = e;
                assert.equal(stashexists, false);
                cb();
            });
        };

        common.setupAndRun('stash', fetchbranch, function (err, r) {
            repo = r;
            done(err);
        });
    });

    it('should create a new stash', function (done) {
        fs.readFile(repo.path + '/.git/logs/refs/stash', 'utf8', function (err, data) {
            assert.equal(data.split('\n').length - 1, 1);
            done();
        });
    });

    it('should apply the last stash', function (done) {
        child_process.exec('git status', function (error, stdout, etderr) {
            assert.notEqual(stdout, '# On branch master\n#\n# Initial commit\n#\nnothing to commit (create/copy files and use "git add" to track)');
            assert.notEqual(stdout, '# On branch master\n#\n# Initial commit\n#\n# Untracked files:\n#   (use "git add <file>..." to include in what will be committed)\n#\n#   text.txt\nnothing added to commit but untracked files present (use "git add" to track)');
            done();
        });
    });
});