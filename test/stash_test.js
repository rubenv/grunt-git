'use strict';

var command = require('../lib/commands').stash;
var Test = require('./_common');

describe('stash', function () {
    it('should create a new stash', function (done) {
        var options = {
        };

        new Test(command, options)
            .expect(['stash', 'save'])
            .run(done);
    });

    it('should apply the last stash', function (done) {
        var options = {
            command: 'apply',
            staged: true,
            stash: '0'
        };

        new Test(command, options)
            .expect(['stash', 'apply', 'stash@{0}', '--index'])
            .run(done);
    });
});
