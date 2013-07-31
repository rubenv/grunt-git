'use strict';

var grunt = require('grunt');
var assert = require('assert');
var common = require('./common');
var fs = require('fs');
var child_process = require('child_process');

describe('reset', function () {
    var repo = null;

    before(function (done) {
        common.setupAndRun('reset', function (err, r) {
            repo = r;
            done(err);
        });
    });

    it('should reset the index', function (done) {
        child_process.exec('git status', {cwd: repo.path}, function (error, stdout, etderr) {
            assert.equal(stdout, '# On branch master\n# Untracked files:\n#   (use "git add <file>..." to include in what will be committed)\n#\n#\ttest\nnothing added to commit but untracked files present (use "git add" to track)\n');
            done();
        });
    });

    it('should remove all files', function (done) {
        fs.readdir(repo.path, function (err, files) {
            assert.deepEqual(files.sort(), ['.git', 'Gruntfile.js', 'test', 'test.txt']);
            done();
        });
    });

    it('should move back to the right commit', function (done) {
        fs.readFile(repo.path + '/.git/logs/HEAD', 'utf8', function (err, data) {
            assert.notEqual(data.indexOf('moving to HEAD~1'), -1);
            done();
        });
    });
});
