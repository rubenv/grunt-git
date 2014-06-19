'use strict';

var command = require('../lib/commands').commit;
var Test = require('./_common');


describe('commit', function () {
    it('should commit', function (done) {
        var options = {
            ignoreEmpty: true
        };

        var files = [
            'test.txt',
            'test2.txt'
        ];

        new Test(command, options, files)
            .expect(['add', 'test.txt'])
            .expect(['add', 'test2.txt'])
            .expect(['diff', '--cached', '--exit-code'], [null, 'diff', 1])
            .expect(['commit', '-m', 'Commit'])
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
            .expect(['add', 'test.txt'])
            .expect(['diff', '--cached', '--exit-code'], [null, 'diff', 1])
            .expect(['commit', '-m', 'Testing!'])
            .run(done);
    });

    it('should not fail when there are no unstaged changes', function (done) {
        var options = {
            ignoreEmpty: false
        };

        new Test(command, options)
            .expect(['diff', '--cached', '--exit-code'], [null, '', 0])
            .expect(['commit', '-m', 'Commit'])
            .run(done);
    });

    it('should not commit when there are no unstaged changes', function (done) {
        var options = {
            ignoreEmpty: true
        };

        new Test(command, options)
            .expect(['diff', '--cached', '--exit-code'], [null, '', 0])
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
            .expect(['add', 'test.txt'])
            .expect(['diff', '--cached', '--exit-code'], [null, 'diff', 1])
            .expect(['commit', '-m', 'Commit', '--no-verify'])
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
            .expect(['add', 'test.txt'])
            .expect(['diff', '--cached', '--exit-code'], [null, 'diff', 1])
            .expect(['commit', '-m', 'Commit', '--no-status'])
            .run(done);
    });
});
