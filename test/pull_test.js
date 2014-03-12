'use strict';

var command = require('../lib/commands').pull;
var Test = require('./_common');

describe('pull', function () {
    it('should pull branch', function (done) {
        var options = {
        };

        new Test(command, options)
            .expect(["pull", "origin"])
            .run(done);
    });

    it('should accept branch option', function (done) {
        var options = {
            branch: 'master'
        };

        new Test(command, options)
            .expect(["pull", "origin", "master"])
            .run(done);
    });
    
});
