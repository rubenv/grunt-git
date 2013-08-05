'use strict';

var fs = require('fs');
var grunt = require('grunt');
var assert = require('assert');
var common = require('./common');

describe('checkout', function () {
    var repo = null;
    var branchexists = null;
    var branchref = null;

    before(function (done) {
        var fetchbranch = function (repo, cb) {
            fs.exists(repo.path + '/.git/refs/heads/testing', function (e) {
                branchexists = e;
                assert.equal(branchexists, false);
                cb();
            });
        };

        common.setupAndRun('checkout', fetchbranch, function (err, r) {
            repo = r;
            done(err);
        });
    });

    it('should create branch', function (done) {
        fs.exists(repo.path + '/.git/refs/heads/testing', function (e) {
            assert.equal(e, true);
            done();
        });
    });

    it('should change branch', function (done) {
        fs.readFile(repo.path + '/.git/HEAD', 'utf8', function (err, data) {
            assert.equal(data, 'ref: refs/heads/testing\n');
            done();
        });
    });
});