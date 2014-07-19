'use strict';

var ArgUtil = require('flopmang');

module.exports = function (task, exec, done) {
    var argUtil = new ArgUtil(task, [
        { // <template>
            option: 'template',
            defaultValue: null,
            useAsFlag: true,
            useValue: true,
            required: false,
            flag: '--template'
        },
        { // <separateGitDir>
            option: 'separateGitDir',
            defaultValue: null,
            useAsFlag: true,
            useValue: true,
            required: false,
            flag: '--separate-git-dir'
        },
        { // <directory>
            option: 'directory',
            defaultValue: null,
            useAsFlag: false,
            useValue: true,
            required: false
        }
    ]);

    var args = ['init'].concat(argUtil.getArgFlags());

    args.push(done);

    exec.apply(this, args);
};

module.exports.description = 'Init a repository.';