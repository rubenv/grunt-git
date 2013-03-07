'use strict';

var grunt = require('grunt');

function handleSpawnOutput(cb) {
    return function (err, result) {
        if (!err) {
            cb();
        } else {
            cb(result.stdout);
        }
    };
}

function runCommand(folder, command, args, cb) {
    grunt.util.spawn({
        cmd: command,
        args: args,
        opts: {
            cwd: folder
        }
    }, handleSpawnOutput(cb));
}

function genCommand(folder, command, args) {
    return function (cb) {
        runCommand(folder, command, args, cb);
    };
}

function Repo(path) {
    return {
        path: path,
        readCommitMessage: function (cb) {
            grunt.util.spawn({
                cmd: "git",
                args: ["log", "--format=format:%s", "HEAD^.."],
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
    setupAndRun: function (fixture, done) {
        grunt.file.mkdir('tmp');

        var repo = new Repo('tmp/' + fixture);

        grunt.file.mkdir(repo.path);
        grunt.file.copy('test/fixtures/' + fixture + '.js', repo.path + '/Gruntfile.js');

        grunt.util.async.series([
            genCommand(repo.path, 'git', ['init']),
            genCommand(repo.path, 'git', ['add', '.']),
            genCommand(repo.path, 'git', ['commit', '-m', 'Initial commit']),
            function (cb) {
                repo.initialRef = grunt.file.read(repo.path + '/.git/refs/heads/master').trim();
                cb();
            },
            genCommand(repo.path, 'grunt'),
            function (cb) {
                repo.currentRef = grunt.file.read(repo.path + '/.git/refs/heads/master').trim();
                cb();
            },
        ], function (err) {
            done(err, repo);
        });
    }
};
