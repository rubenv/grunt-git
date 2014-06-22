'use strict';

var command = require('../lib/commands').merge;
var Test = require('./_common');

describe('merge', function () {
    it('should merge', function (done) {
        var options = {
            branch: 'origin/master'
        };

        new Test(command, options)
            .expect(['merge', 'origin/master'])
            .run(done);
    });

    it('should accept --ff-only option', function (done) {
        var options = {
            branch: 'origin/master',
            ffOnly: true
        };

        new Test(command, options)
            .expect(['merge', 'origin/master', '--ff-only'])
            .run(done);
    });

    it('should accept --no-ff option', function (done) {
        var options = {
            branch: 'origin/master',
            noff: true
        };

        new Test(command, options)
            .expect(['merge', 'origin/master', '--no-ff'])
            .run(done);
    });

    it('should accept --squash option', function (done) {
        var options = {
            branch: 'origin/master',
            squash: true
        };

        new Test(command, options)
            .expect(['merge', 'origin/master', '--squash'])
            .run(done);
    });

    it('should accept --edit option', function (done) {
        var options = {
            branch: 'origin/master',
            edit: true
        };

        new Test(command, options)
            .expect(['merge', 'origin/master', '--edit'])
            .run(done);
    });

    it('should accept --no-edit option', function (done) {
        var options = {
            branch: 'origin/master',
            noEdit: true
        };

        new Test(command, options)
            .expect(['merge', 'origin/master', '--no-edit'])
            .run(done);
    });

    it('should accept --message option', function (done) {
        var options = {
            branch: 'origin/master',
            message: 'test message'
        };

        new Test(command, options)
            .expect(['merge', 'origin/master', '-m', 'test message'])
            .run(done);
    });

    it('should accept --commit option', function (done) {
        var options = {
            branch: 'origin/master',
            commit: true
        };

        new Test(command, options)
            .expect(['merge', 'origin/master', '--commit'])
            .run(done);
    });

    it('should accept --no-commit option', function (done) {
        var options = {
            branch: 'origin/master',
            noCommit: true
        };

        new Test(command, options)
            .expect(['merge', 'origin/master', '--no-commit'])
            .run(done);
    });
});
