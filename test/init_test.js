'use strict';

var command = require('../lib/commands').init;
var Test = require('./_common');

describe('init', function () {
    it('should init a repo', function (done) {
        var options = {
        };

        new Test(command, options)
            .expect(['init'])
            .run(done);
    });

    it('should init a repo from a template', function (done) {
        var options = {
            template: 'testTemplate',
        };

        new Test(command, options)
            .expect(['init', '--template', 'testTemplate'])
            .run(done);
    });

    it('should init a with separate git directory (1)', function (done) {
        var options = {
            separateGitDir: 'newDir'
        };

        new Test(command, options)
            .expect(['init', '--separate-git-dir', 'newDir'])
            .run(done);
    });

    it('should init a in a specified git directory (2)', function (done) {
        var options = {
            directory: 'newDir'
        };

        new Test(command, options)
            .expect(['init', 'newDir'])
            .run(done);
    });
});
