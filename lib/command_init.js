'use strict';

module.exports = function (task, exec, done) {
    var options = task.options({
        template: null,
        separateGitDir: null
    });

    var args = ['init'];

    if (options.template) {
        args.push('--template=' + options.template);
    }

    if (options.separateGitDir) {
        args.push('--separate-git-dir=' + options.separateGitDir);
    }

    // Add callback
    args.push(done);

    exec.apply(this, args);
};

module.exports.description = 'Init a repository.';