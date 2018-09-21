'use strict';

var command = require('../lib/commands').clean;
var Test = require('./_common');

describe('clean', function () {
    it('should clean the repository', function (done) {
        var options = {};

        new Test(command, options)
            .expect(['clean', '-f'])
            .run(done);
    });

    it('should remove untracked directories', function (done) {
        var options = {
            directories: true
        };

        new Test(command, options)
            .expect(['clean', '-f', '-d'])
            .run(done);
    });

    it('should do a dry-run', function (done) {
        var options = {
            dry: true
        };

        new Test(command, options)
            .expect(['clean', '-f', '-n'])
            .run(done);
    });

    it('should be quiet', function (done) {
        var options = {
            quiet: true
        };

        new Test(command, options)
            .expect(['clean', '-f', '-q'])
            .run(done);
    });

    it('should have a exclude pattern', function (done) {
        var options = {
            exclude: '*.log'
        };

        new Test(command, options)
            .expect(['clean', '-f', '-e', '*.log'])
            .run(done);
    });

    it('should support multiple exclude patterns', function (done) {
        var options = {
            exclude: ['*.log', 'local.env']
        };

        new Test(command, options)
            .expect(['clean', '-f', '-e', '*.log', '-e', 'local.env'])
            .run(done);
    });

    it('should have use a non-standard matching pattern', function (done) {
        var options = {
            nonstandard: true
        };

        new Test(command, options)
            .expect(['clean', '-f', '-x'])
            .run(done);
    });

    it('should only remove ignored files', function (done) {
        var options = {
            onlyignoredfiles: true
        };

        new Test(command, options)
            .expect(['clean', '-f', '-X'])
            .run(done);
    });

    it('should only remove files from the given path', function (done) {
        var options = {
            directories: true
        };
        var files = [
            'test.txt',
            'build'
        ];

        new Test(command, options, files)
            .expect(['clean', '-f', '-d', 'test.txt', 'build'])
            .run(done);
    });
});
