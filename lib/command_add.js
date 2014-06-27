'use strict';

module.exports = function (task, exec, done) {
    var options = task.options({
        directory: null,
        files: null
    });

    var args = ['add'];

    if (options.directory) {
        args.push('-C ' + options.directory);
    }

    if (options.files && options.files.length === 1 && options.files[0] === '*') {
        args.push('.');
    }
    //else{}    //TO DO: add individual files

    // Add callback
    args.push(done);

    exec.apply(this, args);
};

module.exports.description = 'Add files to a repository';