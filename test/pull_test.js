'use strict';

var command = require('../lib/commands').pull;
var Test = require('./_common');

describe('pull', function () {
    it('should pull branch', function (done) {
        var options = {
        };

        new Test(command, options)
            .expect(['pull', 'origin'])
            .run(done);
    });

    it('should accept branch option', function (done) {
        var options = {
            branch: 'master'
        };

        new Test(command, options)
            .expect(['pull', 'origin', 'master'])
            .run(done);
    });

    it('should accept --rebase option', function (done) {
        var options = {
            branch: 'master',
            rebase: true
        };

        new Test(command, options)
            .expect(['pull', '--rebase=true', 'origin', 'master'])
            .run(done);
    });

    it('should accept --rebase option with preserve', function (done) {
        var options = {
            branch: 'master',
            rebase: 'preserve'
        };

        new Test(command, options)
            .expect(['pull', '--rebase=preserve', 'origin', 'master'])
            .run(done);
    });
});
