'use strict';

var command = require('../lib/command_merge');
var Test = require('./_common');

describe('merge', function () {
    it('should merge', function (done) {
        var options = {
            branch: 'origin/master'
        };

        new Test(command, options)
            .expect(["merge", "origin/master"])
            .run(done);
    });

    it('should accept --ff-only option', function (done) {
        var options = {
            branch: 'origin/master',
            ffOnly: true
        };

        new Test(command, options)
            .expect(["merge", "origin/master", "--ff-only"])
            .run(done);
    });

    it('should accept --squash option', function (done) {
        var options = {
            branch: 'origin/master',
            squash: true
        };

        new Test(command, options)
            .expect(["merge", "origin/master", "--squash"])
            .run(done);
    })
});
