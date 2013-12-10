'use strict';

var command = require('../lib/commands').rebase;
var Test = require('./_common');

describe('rebase', function () {
    it('should rebase', function (done) {
        var options = {
            branch: 'origin/master'
        };

        new Test(command, options)
            .expect(["rebase", "origin/master"])
            .run(done);
    });

    it('should allow choosing strategy', function (done) {
        var options = {
            branch: 'master',
            theirs: true
        };

        new Test(command, options)
            .expect(["rebase", "--strategy=recursive", "-Xtheirs", "master"])
            .run(done);
    });
});
