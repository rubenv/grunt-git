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
            .expect(["checkout", "-b", "test"])
            .run(done);
    });

    it('should change branch', function (done) {
        var options = {
            branch: 'test'
        };

        new Test(command, options)
            .expect(["checkout", "test"])
            .run(done);
    });
});
