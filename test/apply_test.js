'use strict';

var command = require('../lib/commands').apply;
var Test = require('./_common');

describe('apply', function () {
    it('applies a patch', function (done) {
        var options = {
            patchFiles: './foo.patch'
        };

        new Test(command, options)
            .expect(['apply', './foo.patch'])
            .run(done);
    });

    it('calls stat', function (done) {
        var options = {
            stat: true
        };

        new Test(command, options)
            .expect(['apply', '--stat'])
            .run(done);
    });

    it('calls numstat', function (done) {
        var options = {
            numstat: true
        };

        new Test(command, options)
            .expect(['apply', '--numstat'])
            .run(done);
    });

    it('calls summary', function (done) {
        var options = {
            summary: true
        };

        new Test(command, options)
            .expect(['apply', '--summary'])
            .run(done);
    });

    it('calls check', function (done) {
        var options = {
            check: true
        };

        new Test(command, options)
            .expect(['apply', '--check'])
            .run(done);
    });

    it('calls index', function (done) {
        var options = {
            index: true
        };

        new Test(command, options)
            .expect(['apply', '--index'])
            .run(done);
    });

    it('calls cached', function (done) {
        var options = {
            cached: true
        };

        new Test(command, options)
            .expect(['apply', '--cached'])
            .run(done);
    });

    it('calls threeway', function (done) {
        var options = {
            threeway: true
        };

        new Test(command, options)
            .expect(['apply', '-3'])
            .run(done);
    });

    it('calls reverse', function (done) {
        var options = {
            reverse: true
        };

        new Test(command, options)
            .expect(['apply', '--reverse'])
            .run(done);
    });

    it('calls reject', function (done) {
        var options = {
            reject: true
        };

        new Test(command, options)
            .expect(['apply', '--reject'])
            .run(done);
    });

    it('calls removeLeadingSlashes', function (done) {
        var options = {
            removeLeadingSlashes: 10
        };

        new Test(command, options)
            .expect(['apply', '-p', 10])
            .run(done);
    });

    it('calls numStatKeepPathNames', function (done) {
        var options = {
            numStatKeepPathNames: true
        };

        new Test(command, options)
            .expect(['apply', '-z'])
            .run(done);
    });

    it('calls ensureContextMatch', function (done) {
        var options = {
            ensureContextMatch: 10
        };

        new Test(command, options)
            .expect(['apply', '-C', 10])
            .run(done);
    });

    it('calls unidiffZero', function (done) {
        var options = {
            unidiffZero: true
        };

        new Test(command, options)
            .expect(['apply', '--unidiff-zero'])
            .run(done);
    });

    it('calls apply', function (done) {
        var options = {
            apply: true
        };

        new Test(command, options)
            .expect(['apply', '--apply'])
            .run(done);
    });

    it('calls apply last', function (done) {
        var options = {
            stat: true,
            numstat: true,
            summary: true,
            check: true,
            apply: true
        };

        new Test(command, options)
            .expect(['apply', '--stat', '--numstat', '--summary', '--check',  '--apply'])
            .run(done);
    });

    it('calls noAdd', function (done) {
        var options = {
            noAdd: true
        };

        new Test(command, options)
            .expect(['apply', '--no-add'])
            .run(done);
    });

    it('calls exclude', function (done) {
        var options = {
            exclude: './excluded-dir'
        };

        new Test(command, options)
            .expect(['apply', '--exclude', './excluded-dir'])
            .run(done);
    });

    it('calls include', function (done) {
        var options = {
            include: './included-dir'
        };

        new Test(command, options)
            .expect(['apply', '--include', './included-dir'])
            .run(done);
    });

    it('calls ignoreSpaceChange', function (done) {
        var options = {
            ignoreSpaceChange: true
        };

        new Test(command, options)
            .expect(['apply', '--ignore-space-change'])
            .run(done);
    });

    it('calls ignoreWhitespace', function (done) {
        var options = {
            ignoreWhitespace: true
        };

        new Test(command, options)
            .expect(['apply', '--ignore-whitespace'])
            .run(done);
    });

    it('calls whitespace', function (done) {
        var options = {
            whitespace: 'fix'
        };

        new Test(command, options)
            .expect(['apply', '--whitespace', 'fix'])
            .run(done);
    });

    it('calls inaccurateEOF', function (done) {
        var options = {
            inaccurateEOF: true
        };

        new Test(command, options)
            .expect(['apply', '--inaccurate-eof'])
            .run(done);
    });

    it('calls directory', function (done) {
        var options = {
            directory: './prependedDir'
        };

        new Test(command, options)
            .expect(['apply', '--directory', './prependedDir'])
            .run(done);
    });

    it('calls recount', function (done) {
        var options = {
            recount: true
        };

        new Test(command, options)
            .expect(['apply', '--recount'])
            .run(done);
    });

    it('calls unsafePaths', function (done) {
        var options = {
            unsafePaths: true
        };

        new Test(command, options)
            .expect(['apply', '--unsafe-paths'])
            .run(done);
    });

});
