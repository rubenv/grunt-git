'use strict';

var command = require('../lib/commands').reset;
var Test = require('./_common');

describe('reset', function () {
    it('should reset the index', function (done) {
        var options = {
        };

        new Test(command, options)
            .expect(["reset", "HEAD"])
            .run(done);
    });

    it('should use the reset mode and commit', function (done) {
        var options = {
            mode: 'hard',
            commit: 'HEAD~1'
        };

        new Test(command, options)
            .expect(["reset", "--hard", "HEAD~1"])
            .run(done);
    });

    it('should reset files', function (done) {
        var options = {
        };

        var files = [
            'a.txt',
            'b.txt'
        ];

        new Test(command, options, files)
            .expect(["reset", "HEAD", "a.txt", "b.txt"])
            .run(done);
    });
});
