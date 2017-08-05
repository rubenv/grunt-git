'use strict';

var command = require('../lib/commands').status;
var Test = require('./_common');

describe('status', function () {
    it('should get status in porcelain mode', function (done) {
        var options = {};
        new Test(command, options)
            .expect(['status', '--porcelain'], [null, { stdout: '' }, 0])
            .run(done);
    });
    it('should include ignored files if includeIgnored is true', function (done) {
        var options = {
            includeIgnored: true,
        };
        new Test(command, options)
            .expect(['status', '--porcelain', '--ignored'], [null, { stdout: '' }, 0])
            .run(done);
    });
});
