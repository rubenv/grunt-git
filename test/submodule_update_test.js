'use strict';

var command = require('../lib/commands').submoduleupdate;
var Test = require('./_common');

describe('submodule update', function () {
    it('should update submodules', function (done) {
        var options = {
        };

        new Test(command, options)
            .expect(['submodule', 'update'])
            .run(done);
    });

    it('should accept init option', function (done) {
        var options = {
            init: true
        };

        new Test(command, options)
            .expect(['submodule', 'update', '--init'])
            .run(done);
    });

    it('should accept remote option', function (done) {
        var options = {
            remote: true
        };

        new Test(command, options)
            .expect(['submodule', 'update', '--remote'])
            .run(done);
    });

    it('should accept no-fetch option', function (done) {
        var options = {
            noFetch: true
        };

        new Test(command, options)
            .expect(['submodule', 'update', '--no-fetch'])
            .run(done);
    });

    it('should accept force option', function (done) {
        var options = {
            force: true
        };

        new Test(command, options)
            .expect(['submodule', 'update', '--force'])
            .run(done);
    });

    it('should accept rebase option', function (done) {
        var options = {
            rebase: true
        };

        new Test(command, options)
            .expect(['submodule', 'update', '--rebase'])
            .run(done);
    });

    it('should accept merge option', function (done) {
        var options = {
            merge: true
        };

        new Test(command, options)
            .expect(['submodule', 'update', '--merge'])
            .run(done);
    });

    it('should accept reference option', function (done) {
        var options = {
            reference: 'https://myrepo.com/repo.git'
        };

        new Test(command, options)
            .expect(['submodule', 'update', '--reference', 'https://myrepo.com/repo.git'])
            .run(done);
    });

    it('should accept depth option', function (done) {
        var options = {
            depth: 10
        };

        new Test(command, options)
            .expect(['submodule', 'update', '--depth', '10'])
            .run(done);
    });

    it('should accept recursive option', function (done) {
        var options = {
            recursive: true
        };

        new Test(command, options)
            .expect(['submodule', 'update', '--recursive'])
            .run(done);
    });

    it('should accept path option', function (done) {
        var options = {
            path: '/test/path'
        };

        new Test(command, options)
            .expect(['submodule', 'update', '/test/path'])
            .run(done);
    });
});
