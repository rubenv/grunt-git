'use strict';

var command = require('../lib/commands').revParse;
var Test = require('./_common');

describe('rev-parse', function () {
    it('should print the full SHA-1 checksum of HEAD by default', function (done) {
        var options = {};

        new Test(command, options)
            .expect(['rev-parse', 'HEAD'])
            .run(done);
    });

    it('should print a partial SHA-1 checksum of the given number of characters', function (done) {
        var options = {
            short: 7
        };

        new Test(command, options)
            .expect(['rev-parse', '--short=7', 'HEAD'])
            .run(done);
    });

    it('should print the SHA-1 checksum of a specified tree or commit', function (done) {
        var options = {
            treeIsh: 'some-object'
        };

        new Test(command, options)
            .expect(['rev-parse', 'some-object'])
            .run(done);
    });

    it('should print the abbreviated reference for a specified tree or commit', function (done) {
        var options = {
            abbrevRef: true
        };

        new Test(command, options)
            .expect(['rev-parse', '--abbrev-ref', 'HEAD'])
            .run(done);
    });
});
