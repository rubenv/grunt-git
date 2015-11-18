'use strict';

var command = require('../lib/commands').commit;
var Test = require('./_common');


describe('commit', function () {
    it('should commit', function (done) {
        var options = {
        };

        var files = [
            'test.txt',
            'test2.txt'
        ];

        new Test(command, options, files)
            .expect(['commit', '-m', 'Commit', 'test.txt', 'test2.txt'])
            .run(done);
    });

    it('should use the specified commit message', function (done) {
        var options = {
            message: 'Testing!'
        };

        var files = [
            'test.txt'
        ];

        new Test(command, options, files)
            .expect(['commit', '-m', 'Testing!', 'test.txt'])
            .run(done);
    });

    it('should use the specified commit message', function (done) {
        var options = {
            message: 'Testing!',
            description: 'Moar testing!'
        };

        var files = [
            'test.txt'
        ];

        new Test(command, options, files)
            .expect([
                'commit',
                '-m',
                'Testing!',
                '-m',
                'Moar testing!',
                'test.txt'
            ])
            .run(done);
    });

    it('should add --allow-empty arg when allowEmpty is true', function (done) {
        var options = {
            allowEmpty: true
        };

        var files = [
            'test.txt'
        ];

        new Test(command, options, files)
            .expect(['commit', '-m', 'Commit', '--allow-empty', 'test.txt'])
            .run(done);
    });

    it('should add --no-verify arg when noVerify is true', function (done) {
        var options = {
            noVerify: true
        };

        var files = [
            'test.txt'
        ];

        new Test(command, options, files)
            .expect(['commit', '-m', 'Commit', '--no-verify', 'test.txt'])
            .run(done);
    });

    it('should add --no-status arg when noStatus is true', function (done) {
        var options = {
            noStatus: true
        };

        var files = [
            'test.txt'
        ];

        new Test(command, options, files)
            .expect(['commit', '-m', 'Commit', '--no-status', 'test.txt'])
            .run(done);
    });
});
