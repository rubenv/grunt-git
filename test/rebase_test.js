'use strict';

var fs = require('fs');
var grunt = require('grunt');
var assert = require('assert');
var common = require('./common');
var u = require('./utils');

describe('rebase', function () {
    var repo = null;
    var branchexists = null;
    var branchref = null;
    var beforeDone = false;

    before(function (done) {
        var beforeCallback = function (repo, cb) {
            repo.testingCommitMsg = 'first ref on testing';
            repo.masterCommitMsg = 'Second commit on master';

            grunt.util.async.series([
                //1. commit a change
                u.genCommand(repo.path, 'touch', ['masterFile']),
                u.genCommand(repo.path, 'git', ['add', '.']),
                u.genCommand(repo.path, 'git', ['commit', '-m', repo.masterCommitMsg]),
                //2. rewind head 1 step
                u.genCommand(repo.path, 'git', ['checkout', 'HEAD^']),
                //3. create branch `testing`
                u.genCommand(repo.path, 'git', ['checkout', '-b', 'testing']),
                //4. commit a change
                u.genCommand(repo.path, 'touch', ['testingFile']),
                u.genCommand(repo.path, 'git', ['add', '.']),
                u.genCommand(repo.path, 'git', ['commit', '-m', repo.testingCommitMsg])
            ]);
            cb();
        };

        common.setupAndRun('rebase', beforeCallback, function (err, r) {
            repo = r;
            done(err);
        });
    });

    it('should contain commit from rebased-onto branch', function (done) {
        //confirm contents
        fs.exists(repo.path + '/masterFile', function (e) {
            assert.equal(e, true);
        });
        //confirm it's the proper commit
        var opts =  { ref : 'HEAD^' };
        repo.readCommitMessage(function (err, message) {
            assert.equal(message, repo.masterCommitMsg);
            done();
        }, opts);
    });

    it('should put its own commit last', function (done) {
        repo.readCommitMessage(function (err, message) {
            assert.equal(message, repo.testingCommitMsg);
            done();
        });
    });
});
