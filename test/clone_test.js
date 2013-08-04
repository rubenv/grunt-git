'use strict';

var fs = require('fs');
var grunt = require('grunt');
var assert = require('assert');
var child_process = require('child_process');

describe('clone', function () {
    var repo = null;

    before(function (done) {
        grunt.file.mkdir('tmp');
        grunt.file.mkdir('tmp/clone');
        grunt.file.copy('test/fixtures/clone.js', 'tmp/clone/Gruntfile.js');

        grunt.util.spawn({
            'cmd': 'grunt',
            'opts': {
                'cwd': 'tmp/clone'
            }
        }, function () { 
            done();
        });
    });

    it('should have cloned the repo', function (done) {
        fs.readFile('tmp/clone/gitclone-test/README.md', 'utf8', function (err, data) {
            assert.equal(data.substring(0, 13), 'gitclone-test');
            done();
        });
    });
});