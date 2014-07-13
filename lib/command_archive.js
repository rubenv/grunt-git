'use strict';

var async = require('grunt').util.async;
var grunt = require('grunt');
var ArgUtil = require('flopmang');

module.exports = function (task, exec, done) {
    var argUtil = new ArgUtil(task, [
        {
            // --format=<fmt>
            // Format of the resulting archive: tar or zip. If this option is not given, and the output file is specified, the format is inferred from the filename if possible (e.g. writing to "foo.zip" makes the output to be in the zip format). Otherwise the output format is tar.
            option: 'format',
            defaultValue: null,
            useAsFlag: true,
            useValue: true
        },
        {
            // --prefix=<prefix>/
            // Prepend <prefix>/ to each filename in the archive.
            option: 'prefix',
            defaultValue: null,
            useAsFlag: true,
            useValue: true
        },
        {
            // --output=<file>
            // Write the archive to <file> instead of stdout.
            option: 'output',
            defaultValue: null,
            useAsFlag: true,
            useValue: true
        },
        {
            // --remote=<repo>
            // Instead of making a tar archive from the local repository, retrieve a tar archive from a remote repository.
            // Note: It seems that GitHub does not support the remote archiving feature.
            option: 'remote',
            defaultValue: null,
            useAsFlag: true,
            useValue: true
        },
        {
            // <tree-ish>
            // The tree or commit to produce an archive for.
            option: 'treeIsh',
            defaultValue: 'master',
            useAsFlag: false,
            useValue: true,
            required: true
        },
        {
            // <path>
            // Without an optional path parameter, all files and subdirectories of the current working directory are included in the archive. If one or more paths are specified, only these are included.
            option: 'path',
            defaultValue: null,
            useAsFlag: false,
            useValue: true,
            customValueFn: function (arg) {
                if (arg.value) {
                    if (grunt.util.kindOf(arg.value) === 'string') {
                        // Backwards compatible to <= 0.2.8.
                        arg.value = [arg.value];
                    }
                    return arg.value;
                }
                return null;
            }
        }
    ]);
    var options = task.options({
        treeIsh: 'master'
    });

    var args = ['archive'].concat(argUtil.getArgFlags());
    // git archive --format=<format> --prefix=<base_directory>/ treeIsh --output=<output file>

    // Add callback
    args.push(done);

    exec.apply(this, args);
};

module.exports.description = 'Create a git archive.';
