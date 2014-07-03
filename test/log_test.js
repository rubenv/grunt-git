'use strict';

var command = require('../lib/commands').log;
var Test = require('./_common');


describe('log', function () {
    it('should log', function (done) {
        var options = {
            merges: true
        };
        new Test(command, options)
            .expect(['log', '--pretty=format:' + command.format], [null, { stdout: '' }])
            .run(done);
    });
});
