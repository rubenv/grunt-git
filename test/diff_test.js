'use strict';

var command = require('../lib/commands').diff;
var Test = require('./_common');

describe('diff', function () {
    it('should run git diff', function (done) {
        var options = {
        };

        new Test(command, options)
            .expect(['diff'])
            .run(done);
    });

    it('should accept --exit-code option', function (done) {
        var options = {
            exitCode: true
        };

        new Test(command, options)
            .expect(['diff', '--exit-code'])
            .run(done);
    });

    it('should accept --cached option', function (done) {
        var options = {
            cached: true
        };

        new Test(command, options)
            .expect(['diff', '--cached'])
            .run(done);
    });
});
