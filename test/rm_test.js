'use strict';

var command = require('../lib/commands').rm;
var Test = require('./_common');

describe('rm', function () {
    it('should remove a single file', function (done) {
        var options = {};
        var files = ['foo'];

        new Test(command, options, files)
          .expect(['rm', 'foo'])
          .run(done);
    });

    it('should remove multiple files', function (done) {
        var options = {};
        var files = ['foo', 'bar', 'baz', 'whiz'];

        new Test(command, options, files)
          .expect(['rm', 'foo', 'bar', 'baz', 'whiz'])
          .run(done);
    });

    it('should force removal of a single file', function (done) {
        var options = {
            force: true
        };
        var files = ['foo'];

        new Test(command, options, files)
          .expect(['rm', '-f', 'foo'])
          .run(done);
    });

    it('should force removal of multiple files', function (done) {
        var options = {
            force: true
        };
        var files = ['foo', 'bar', 'baz', 'whiz'];

        new Test(command, options, files)
          .expect(['rm', '-f', 'foo', 'bar', 'baz', 'whiz'])
          .run(done);
    });

    it('should allow the recursive flag', function (done) {
        var options = {
            recurse: true
        };
        var files = ['foo', 'bar', 'baz', 'whiz'];

        new Test(command, options, files)
          .expect(['rm', '-r', 'foo', 'bar', 'baz', 'whiz'])
          .run(done);
    });
});
