'use strict';

var command = require('../lib/commands').log;
var Test = require('./_common');


describe('log', function () {
    it('should log with default pretty format', function (done) {
        var options = {
            noMerges: false
        };
        new Test(command, options)
            .expect(['log', '--pretty=format:' + command.format], [null, { stdout: '' }])
            .run(done);
    });
    it('should log with specified pretty format', function (done) {
        var customFormat = 'format:some custom format';
        var options = {
            pretty: customFormat
        };
        new Test(command, options)
            .expect(['log', '--pretty=' + customFormat, '--no-merges'], [null, { stdout: '' }])
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
    it('should log merges if noMerges is not defined', function (done) {
        var options = {
        };
        new Test(command, options)
            .expect(['log', '--pretty=format:' + command.format, '--no-merges'], [null, { stdout: '' }])
            .run(done);
    });
    it('should order by date is dateOrder is defined', function (done) {
        var options = {
        };
        new Test(command, options)
            .expect(['log', '--pretty=format:' + command.format, '--no-merges'], [null, { stdout: '' }])
            .run(done);
    });
    it('should order by date if --before or --after is used', function (done) {
        var options = {
            noMerges: false,
            dateOrder: true
        };
        new Test(command, options)
            .expect(['log', '--pretty=format:' + command.format, '--date-order'], [null, { stdout: '' }])
            .run(done);
    });
    it('should log from a specified branch to HEAD if from is used', function (done) {
        var options = {
            from: '1234'
        };
        new Test(command, options)
            .expect(['log', '--pretty=format:' + command.format, '--no-merges', '1234..HEAD'], [null, { stdout: '' }])
            .run(done);
    });
    it('should log from a specified branch to a specfied branch if from and to are used', function (done) {
        var options = {
            from: '1234',
            to: '6789'
        };
        new Test(command, options)
            .expect(['log', '--pretty=format:' + command.format, '--no-merges', '1234..6789'], [null, { stdout: '' }])
            .run(done);
    });
});
