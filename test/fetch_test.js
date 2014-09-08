'use strict';

var command = require('../lib/commands').fetch;
var Test = require('./_common');

describe('fetch', function () {

    it('should fetch', function (done) {
        var options = {
            repository: 'origin'
        };

        new Test(command, options)
            .expect(['fetch', 'origin'])
            .run(done);
    });

    it('should accept --all option', function (done) {
        var options = {
            all: true
        };

        new Test(command, options)
            .expect(['fetch', '--all'])
            .run(done);
    });

    it('should accept --append option', function (done) {
        var options = {
            repository: 'origin',
            append: true
        };

        new Test(command, options)
            .expect(['fetch', 'origin', '--append'])
            .run(done);
    });

    it('should accept --tags option', function (done) {
        var options = {
            repository: 'origin',
            tags: true
        };

        new Test(command, options)
            .expect(['fetch', 'origin', '--tags'])
            .run(done);
    });

    it('should accept --prune option', function (done) {
        var options = {
            repository: 'origin',
            prune: true
        };

        new Test(command, options)
            .expect(['fetch', 'origin', '--prune'])
            .run(done);
    });

    it('should accept --no-tags option', function (done) {
        var options = {
            repository: 'origin',
            notags: true
        };

        new Test(command, options)
            .expect(['fetch', 'origin', '--no-tags'])
            .run(done);
    });
});
