'use strict';

var grunt = require('grunt');

function setupAndRun(test, fixture) {
    grunt.file.mkdir('tmp/' + fixture);
    grunt.file.copy('test/fixtures/' + fixture + '.js', 'tmp/' + fixture + '/Gruntfile.js');
    grunt.log.error('Hello');
    grunt.util.spawn({
        grunt: true,
        opts: {
            cwd: 'tmp/' + fixture
        }
    }, function () {
        grunt.log.error(arguments);
    });
}

exports.test = {
    setUp: function (done) {
        grunt.file.mkdir('tmp');
        done();
    },

    commit: function (test) {
        test.expect(1);
        setupAndRun(test, 'commit');
        test.equal(1, 1, 'should be equal');
        test.done();
    }
};
