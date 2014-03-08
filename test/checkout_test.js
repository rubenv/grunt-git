'use strict';

var command = require('../lib/commands').checkout;
var Test = require('./_common');

describe('checkout', function () {
    it('should create branch', function (done) {
        var options = {
            create: true,
            branch: 'test'
        };

        new Test(command, options)
            .expect([void(0), "checkout", "-b", "test"])
            .run(done);
    });

    it('should change branch', function (done) {
        var options = {
            branch: 'test'
        };

        new Test(command, options)
            .expect([void(0), "checkout", "test"])
            .run(done);
    });
});
