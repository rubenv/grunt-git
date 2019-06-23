'use strict';

var command = require('../lib/commands').add;
var Test = require('./_common');

describe('add', function () {
    it('should add files', function (done) {
        var options = {};

        var files = ['README', 'LICENSE'];

        new Test(command, options, files)
            .expect(['add', 'README', 'LICENSE'])
            .run(done);
    });

    it('should add --force arg when force is true', function (done) {
        var options = {
            force: true
        };

        var files = [
            'test.txt', 'b.txt'
        ];

        new Test(command, options, files)
            .expect(['add', '--force', 'test.txt', 'b.txt'])
            .run(done);
    });

    it('should add --all arg when all is true', function (done) {
        var options = {
            all: true
        };

        var files = [
            '.'
        ];

        new Test(command, options, files)
            .expect(['add', '--all', '.'])
            .run(done);
    });
});
