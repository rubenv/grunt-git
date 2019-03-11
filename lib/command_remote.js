'use strict';

var async = require('grunt').util.async;
var grunt = require('grunt');
var ArgUtil = require('flopmang');

module.exports = function (task, exec, done) {
    var options = task.options({});
    var opts;
    var argUtil = new ArgUtil(task, [
        {
            option: 'verbose',
            defaultValue: false,
            useAsFlag: true,
            useValue: false,
            useDasherize: true
        },
        {
            option: 'add',
            useAsFlag: true,
            useValue: true,
            useDasherize: false,
            customFlagFn: function (arg) { //needed to detect wheter the intention was the git remote add command or wheter add is used as a extra flag
                if (arg.value && arg.value.name && arg.value.url) {
                    return arg.option;
                }
                return null;
            },
            customValueFn: function (arg) {
                if (arg.value && arg.value.name && arg.value.url) {
                    var value = arg.value.name + ' ' + arg.value.url;
                    opts = '';
                    if (options.t !== undefined) {
                        opts += '-t ' + options.t + ' ';
                    }
                    if (options.m !== undefined) {
                        opts += '-m ' + options.m + ' ';
                    }
                    if (options.f !== undefined) {
                        opts += '-f ';
                    }
                    if (options.tags !== undefined) {
                        opts += options.tags ? '--tags ': '--no-tags ';
                    }
                    if (options.mirror !== undefined) {
                        opts += '--mirror=' + options.mirror + ' ';
                    }
                    return opts + value;
                }
                return null;
            }
        },
        {
            option: 'rename',
            useAsFlag: true,
            useValue: true,
            useDasherize: false,
            customValueFn: function (arg) {
                if (arg.value && arg.value.old && arg.value.new) {
                    return arg.value.old + ' ' + arg.value.new;
                }
                return null;
            }
        },
        {
            option: 'remove',
            useAsFlag: true,
            useValue: true,
            useDasherize: false
        },
        {
            option: 'sethead',
            useAsFlag: true,
            useValue: true,
            useDasherize: false,
            flag: 'set-head',
            customValueFn: function (arg) {
                if (arg.value) {
                    opts = '';
                    if (options.auto !== undefined) {
                        opts += ' --auto';
                    } else if (options.delete !== undefined) {
                        opts += ' --delete';
                    } else if (options.branch !== undefined) {
                        opts += ' ' + options.branch;
                    }
                    return arg.value + opts;
                }
                return null;
            }
        },
        {
            option: 'setbranches',
            useAsFlag: true,
            useValue: true,
            useDasherize: false,
            flag: 'set-branches',
            customValueFn: function (arg) {
                if (arg.value && arg.value.name && arg.value.branch) {
                    var value = arg.value.name + ' ' + arg.value.branch;
                    opts = '';
                    if (options.add !== undefined) {
                        opts += '--add ';
                    }

                    return opts + value;
                }
                return null;
            }
        },
        {
            option: 'geturl',
            useAsFlag: true,
            useValue: true,
            useDasherize: false,
            flag: 'get-url',
            customValueFn: function (arg) {
                if (arg.value) {
                    opts = '';
                    if (options.push !== undefined) {
                        opts += '--push ';
                    }
                    if (options.all !== undefined) {
                        opts += '--all ';
                    }

                    return opts + arg.value;
                }
                return null;
            }
        },
        {
            option: 'seturl',
            useAsFlag: true,
            useValue: true,
            useDasherize: false,
            flag: 'set-url',
            customValueFn: function (arg) {
                if (arg.value && arg.value.name && arg.value.url) {
                    var value = arg.value.name + ' ' + arg.value.url;
                    opts = '';
                    if (options.add !== undefined) {
                        opts += '--add ';
                    } else if (options.delete !== undefined) {
                        opts += '--delete ';
                    } else if (arg.value.oldurl) {
                        value += ' ' + arg.value.oldurl;
                    }
                    if (options.push !== undefined) {
                        opts += '--push ';
                    }

                    return opts + value;
                }
                return null;
            }
        },
        {
            option: 'show',
            useAsFlag: true,
            useValue: true,
            useDasherize: false,
            customValueFn: function (arg) {
                if (arg.value) {
                    opts = '';
                    if (options.n !== undefined) {
                        opts += '-n ';
                    }

                    return opts + arg.value;
                }
                return null;
            }
        },
        {
            option: 'prune',
            useAsFlag: true,
            useValue: true,
            useDasherize: false,
            customFlagFn: function (arg) { //needed to detect wheter the intention was the git remote prune command or wheter prune is used as a extra flag
                if (arg.value && typeof(arg.value) === 'string') {
                    return arg.option;
                }
                return null;
            },
            customValueFn: function (arg) {
                if (arg.value  && typeof(arg.value) === 'string') {
                    return arg.value;
                }
                return null;
            }
        },
        {
            option: 'update',
            useAsFlag: true,
            useValue: true,
            useDasherize: false,
            customValueFn: function (arg) {
                if (arg.value && Array.isArray(arg.value)) {
                    opts = '';
                    if (options.prune !== undefined) {
                        opts += '--prune ';
                    }

                    return opts + arg.value.join(' ');
                }
                return null;
            }
        }
    ]);

    function handleResult(err, result) {
        if (err) {
            grunt.fail.fatal('Error running git remote');
            return;
        }

        if (typeof options.callback === 'function') {
            options.callback(result.stdout);
        }
        done();
    }


    var args = ['remote'].concat(argUtil.getArgFlags());
    var argOpts = args.pop().split(' ');
    for (var argNdx in argOpts){
        args.push(argOpts[argNdx]);
    }
    args.push(handleResult);
    exec.apply(null, args);
};

module.exports.description = 'Manage set of tracked repositories.';

