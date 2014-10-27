'use strict';

var command = require('../lib/commands').log;
var Test = require('./_common');


describe('log', function () {
    it('should log', function (done) {
        var options = {
            noMerges: false
        };
        new Test(command, options)
            .expect(['log', '--pretty=format:' + command.format], [null, { stdout: '' }])
            .run(done);
    });
    it('should log the specified number of logs', function (done) {
        var options = {
            noMerges: false,
            number: 10
        };
        new Test(command, options)
            .expect(['log', '--pretty=format:' + command.format, '-n', 10], [null, { stdout: '' }])
            .run(done);
    });
    it('should not log merges if noMerges is true', function (done) {
        var options = {
            noMerges: true
        };
        new Test(command, options)
            .expect(['log', '--pretty=format:' + command.format, '--no-merges'], [null, { stdout: '' }])
            .run(done);
    });
    it('should order by date if --before or --after is used', function (done) {
        var before = new Date();
        var after = new Date();
        var options = {
            noMerges: false,
            before: before,
            after: after
        };
        new Test(command, options)
            .expect([
                'log',
                '--pretty=format:' + command.format,
                '--before', before.toISOString(),
                '--after', after.toISOString(),
                '--date-order'
            ], [null, { stdout: '' }])
            .run(done);
    });
});
