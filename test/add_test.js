'use strict';

var command = require('../lib/commands').add;
var Test = require('./_common');

describe('add', function () {
    it('add', function (done) {
        var options = {
        };

        new Test(command, options)
            .expect(['add'])
            .run(done);
    });

    it('add all files', function (done) {
        var options = {
            files: ['*']
        };

        new Test(command, options)
            .expect(['add', '.'])
            .run(done);
    });

    it('should add all files to a specified directory', function (done) {
        var options = {
            directory: 'testDirectory',
            files: ['*']
        };

        new Test(command, options)
            .expect(['add', '-C testDirectory', '.'])
            .run(done);
    });
});
