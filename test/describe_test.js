'use strict';

var command = require('../lib/commands').describe;
var Test = require('./_common');

describe('describe', function () {
    it('describe tag', function (done) {
        var options = {
            tags: true
        };

        new Test(command, options)
            .expect(['describe', '--tags', '--abbrev=7', '--candidates=10', 'HEAD'])
            .run(done);
    });

    it('describe all', function (done) {
        var options = {
            all: true
        };

        new Test(command, options)
            .expect(['describe', '--all', '--abbrev=7', '--candidates=10', 'HEAD'])
            .run(done);
    });

    it('describe abbrev', function (done) {
        var options = {
            abbrev: 0
        };

        new Test(command, options)
            .expect(['describe', '--abbrev=0', '--candidates=10', 'HEAD'])
            .run(done);
    });

    it('describe candidates', function (done) {
        var options = {
            candidates: 5
        };

        new Test(command, options)
            .expect(['describe', '--abbrev=7', '--candidates=5', 'HEAD'])
            .run(done);
    });

    it('describe contains', function (done) {
        var options = {
            contains: 5
        };

        new Test(command, options)
            .expect(['describe', '--contains', '--abbrev=7', '--candidates=10', 'HEAD'])
            .run(done);
    });
});
