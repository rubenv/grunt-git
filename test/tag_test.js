'use strict';

var fs = require('fs');
var grunt = require('grunt');
var assert = require('assert');
var common = require('./common');

describe('tag', function () {

    describe('when tagging a new branch', function () {
        var repo = null;
        var tagexists = null;
        var tagref = null;

        before(function (done) {
            var fetchtag = function (repo, cb) {
                fs.exists(repo.path + '/.git/refs/tags/0.0.1', function (e) {
                    tagexists = e;
                    assert.equal(tagexists, false);
                    cb();
                });
            };

            common.setupAndRun('tag', fetchtag, function (err, r) {
                repo = r;
                done(err);

            });

        });

        it('should create tag', function (done) {
            fs.exists(repo.path + '/.git/refs/tags/0.0.1', function (e) {
                assert.equal(e, true);
                done();
            });
        });

    });

    describe('when using an existing tag', function () {

        it('should fail by default', function (done) {
            common.setupAndRun('tag_failcase', function (err, r) {
                if (err) {
                    done();
                } else {
                    done(new Error('Tag failcase succeeded unexpectedly'));
                }
            });
        });

        it('should succeed when forced', function (done) {
            common.setupAndRun('tag_force', function (err, r) {
                assert.ok(!err);
                done();
            });
        });
    });
});
