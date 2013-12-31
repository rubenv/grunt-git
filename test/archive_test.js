'use strict';

var command = require('../lib/commands').archive;
var Test = require('./_common');

describe('archive', function () {

    it('should by default archive the master branch', function (done) {
        var options = {};
        new Test(command, options)
            .expect(["archive", "master"])
            .run(done);
    });

    it('should archive a specific commit', function (done) {
        var options = {
            treeIsh: 'abcd123'
        };

        new Test(command, options)
            .expect(["archive", "abcd123"])
            .run(done);
    });

    it('should archive with a specific format', function (done) {
        var options = {
            treeIsh: 'master',
            format: 'tar.gz'
        };

        new Test(command, options)
            .expect(["archive", "--format", "tar.gz", "master"])
            .run(done);
    });

    it('should archive with a specific prefix', function (done) {
        var options = {
            treeIsh: 'master',
            prefix: 'my-project/'
        };

        new Test(command, options)
            .expect(["archive", "--prefix", "my-project/", "master"])
            .run(done);
    });

    it('should archive to a specific output file', function (done) {
        var options = {
            treeIsh: 'master',
            output: '/tmp/my-project.tar'
        };

        new Test(command, options)
            .expect(["archive", "--output", "/tmp/my-project.tar", "master"])
            .run(done);
    });

    it('should retrieve an archive from a remote repository', function (done) {
        var options = {
            treeIsh: 'master',
            remote: 'https://github.com/rubenv/grunt-git.git'
        };

        new Test(command, options)
            .expect(["archive", "--remote", "https://github.com/rubenv/grunt-git.git", "master"])
            .run(done);
    });

});
