'use strict';

var grunt = require('grunt');
var u = require('./utils');

function Repo(path) {
    return {
        path: path,
        readCommitMessage: function (cb, o) {
            //read `ref` option or default to commit
            var ref = (o && o.ref) ? o.ref : "HEAD";
            grunt.util.spawn({
                cmd: "git",
                args: ["show", "-s", "--format=format:%s", ref],
                opts: {
                    cwd: this.path
                }
            }, function (err, result) {
                if (err) {
                    return cb(err);
                } else {
                    return cb(null, result.stdout.trim());
                }
            });
        }
    };
}

module.exports = {
    setupAndRun: function (fixture, before, done) {
        if (!done) {
            done = before;
            before = function (repo, cb) { cb(); };
        }

        grunt.file.mkdir('tmp');

        var repo = new Repo('tmp/' + fixture);

        grunt.file.mkdir(repo.path);
        grunt.file.copy('test/fixtures/' + fixture + '.js', repo.path + '/Gruntfile.js');

        grunt.util.async.series([
            u.genCommand(repo.path, 'git', ['init']),
            u.genCommand(repo.path, 'git', ['add', '.']),
            u.genCommand(repo.path, 'git', ['commit', '-m', 'Initial commit']),
            function (cb) {
                repo.initialRef = grunt.file.read(repo.path + '/.git/refs/heads/master').trim();
                cb();
            },
            function (cb) { before(repo, cb); },
            u.genCommand(repo.path, 'grunt'),
            function (cb) {
                repo.currentRef = grunt.file.read(repo.path + '/.git/refs/heads/master').trim();
                cb();
            },
        ], function (err) {
            done(err, repo);
        });
    }
};
