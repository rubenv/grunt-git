'use strict';

var command = require('../lib/commands').commit;
var Test = require('./_common');


describe('commit', function () {
    it('should commit', function (done) {
        var options = {
            ignoreEmpty: true
        };

        var files = [
            "test.txt",
            "test2.txt"
        ];

        new Test(command, options, files)
            .expect([void(0), "add", "test.txt"])
            .expect([void(0), "add", "test2.txt"])
            .expect([void(0), "diff", "--cached", "--exit-code"], [null, "diff", 1])
            .expect([void(0), "commit", "-m", "Commit"])
            .run(done);
    });

    it('should use the specified commit message', function (done) {
        var options = {
            message: 'Testing!'
        };

        var files = [
            "test.txt"
        ];

        new Test(command, options, files)
            .expect([void(0), "add", "test.txt"])
            .expect([void(0), "diff", "--cached", "--exit-code"], [null, "diff", 1])
            .expect([void(0), "commit", "-m", "Testing!"])
            .run(done);
    });

    it('should not fail when there are no unstaged changes', function (done) {
        var options = {
            ignoreEmpty: false
        };

        new Test(command, options)
            .expect([void(0), "diff", "--cached", "--exit-code"], [null, "", 0])
            .expect([void(0), "commit", "-m", "Commit"])
            .run(done);
    });

    it('should not commit when there are no unstaged changes', function (done) {
        var options = {
            ignoreEmpty: true
        };

        new Test(command, options)
            .expect([void(0), "diff", "--cached", "--exit-code"], [null, "", 0])
            .run(done);
    });
});
