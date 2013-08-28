'use strict';

var grunt = require('grunt');
var assert = require('assert');
var common = require('./common');

describe('commit', function () {
    var repo = null;

    before(function (done) {
        common.setupAndRun('commit', function (err, r) {
            repo = r;
            done(err);
        });
    });

    it('should commit', function () {
        assert.notEqual(repo.initialRef, repo.currentRef);
    });

    it('should use the specified commit message', function (done) {
        repo.readCommitMessage(function (err, message) {
            assert.equal(message, 'Testing');
            done();
        });
    });

    describe('ignore empty', function () {
        before(function (done) {
            common.setupAndRun('commit_ignore_empty', function (err, r) {
                repo = r;
                done(err);
            });
        });

        it('should not fail when there are no unstaged changes', function (done) {
            done();
        });
    });
});
