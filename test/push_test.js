'use strict';

var command = require('../lib/commands').push;
var Test = require('./_common');

describe('push', function () {
    it('should push branch', function (done) {
        var options = {
        };

        new Test(command, options)
            .expect(["push", "origin"])
            .run(done);
    });

    it('should accept --tags option', function (done) {
        var options = {
            tags: true
        };

        new Test(command, options)
            .expect(["push", "--tags", "origin"])
            .run(done);
    });

    it('should accept --all option', function (done) {
        var options = {
            all: true
        };

        new Test(command, options)
            .expect(["push", "--all", "origin"])
            .run(done);
    });

    it('should accept branch option', function (done) {
        var options = {
            branch: 'master'
        };

        new Test(command, options)
            .expect(["push", "origin", "master"])
            .run(done);
    });

    it('should accept --set-upstream option', function (done) {
        var options = {
            upstream: true,
            branch: 'master'
        };

        new Test(command, options)
            .expect(["push", "--set-upstream", "origin", "master"])
            .run(done);
    });
});
