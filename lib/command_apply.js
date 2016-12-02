'use strict';

var async = require('grunt').util.async;
var grunt = require('grunt');
var ArgUtil = require('flopmang');

module.exports = function (task, exec, done) {
    var options = task.options({
        prop: 'gitapply.' + task.target + '.result'
    });

    var argUtil = new ArgUtil(task, [
            {
                option: 'stat',
                defaultValue: false,
                useAsFlag: true,
                useValue: false,
                flag: '--stat'
            },
            {
                option: 'numstat',
                defaultValue: false,
                useAsFlag: true,
                useValue: false,
                flag: '--numstat'
            },
            {
                option: 'summary',
                defaultValue: false,
                useAsFlag: true,
                useValue: false,
                flag: '--summary'
            },
            {
                option: 'check',
                defaultValue: false,
                useAsFlag: true,
                useValue: false,
                flag: '--check'
            },
            {
                option: 'index',
                defaultValue: false,
                useAsFlag: true,
                useValue: false,
                flag: '--index'
            },
            {
                option: 'cached',
                defaultValue: false,
                useAsFlag: true,
                useValue: false,
                flag: '--cached'
            },
            {
                option: 'threeway',
                defaultValue: false,
                useAsFlag: true,
                useValue: false,
                flag: '-3'
            },
            {
                option: 'recount',
                defaultValue: false,
                useAsFlag: true,
                useValue: false,
                flag: '--recount'
            },
            {
                option: 'reject',
                defaultValue: false,
                useAsFlag: true,
                useValue: false,
                flag: '--reject'
            },
            {
                option: 'reverse',
                defaultValue: false,
                useAsFlag: true,
                useValue: false,
                flag: '--reverse'
            },
            {
                option: 'numStatKeepPathNames',
                defaultValue: false,
                useAsFlag: true,
                useValue: false,
                flag: '-z'
            },
            {
                option: 'removeLeadingSlashes',
                defaultValue: null,
                useAsFlag: true,
                useValue: true,
                flag: '-p'
            },
            {
                option: 'ensureContextMatch',
                defaultValue: null,
                useAsFlag: true,
                useValue: true,
                flag: '-C'
            },
            {
                option: 'unidiffZero',
                defaultValue: false,
                useAsFlag: true,
                useValue: false,
                flag: '--unidiff-zero'
            },
            {
                option: 'noAdd',
                defaultValue: false,
                useAsFlag: true,
                useValue: false,
                flag: '--no-add'
            },
            {
                option: 'exclude',
                defaultValue: null,
                useAsFlag: true,
                useValue: true,
                flag: '--exclude'
            },
            {
                option: 'include',
                defaultValue: null,
                useAsFlag: true,
                useValue: true,
                flag: '--include'
            },
            {
                option: 'ignoreSpaceChange',
                defaultValue: false,
                useAsFlag: true,
                useValue: false,
                flag: '--ignore-space-change'
            },
            {
                option: 'ignoreWhitespace',
                defaultValue: false,
                useAsFlag: true,
                useValue: false,
                flag: '--ignore-whitespace'
            },
            {
                option: 'inaccurateEOF',
                defaultValue: false,
                useAsFlag: true,
                useValue: false,
                flag: '--inaccurate-eof'
            },
            {
                option: 'whitespace',
                defaultValue: null,
                useAsFlag: true,
                useValue: true,
                flag: '--whitespace'
            },
            {
                option: 'directory',
                defaultValue: null,
                useAsFlag: true,
                useValue: true,
                flag: '--directory'
            },
            {
                option: 'unsafePaths',
                defaultValue: false,
                useAsFlag: true,
                useValue: false,
                flag: '--unsafe-paths'
            },
            {
                option: 'apply',
                defaultValue: false,
                useAsFlag: true,
                useValue: false,
                flag: '--apply'
            },
            {
                option: 'patchFiles',
                defaultValue: null,
                useAsFlag: false,
                useValue: true
            }
    ]);

    var args = ['apply'].concat(argUtil.getArgFlags());

    function handleResult(err, result) {
        var logs;

        if (err) {
            grunt.fail.fatal('Error running git apply');
            return;
        }

        if (typeof options.callback === 'function') {
            options.callback(result.stdout);
        }
        done();
    }

    args.push(handleResult);

    exec.apply(null, args);
};

module.exports.description = 'Apply a git patch to your cwd.';
