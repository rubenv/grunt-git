'use strict';

var async = require('grunt').util.async;
var grunt = require('grunt');
var ArgUtil = require('flopmang');

module.exports = function (task, exec, done) {
    var argUtil = new ArgUtil(task, [
        {
            option: 'all',
            defaultValue: false,
            useAsFlag: true,
            useValue: false
        },
        {
            option: 'force',
            defaultValue: false,
            useAsFlag: true,
            useValue: false
        }
    ]);

    var options = argUtil.options;
    var args = ['add'].concat(argUtil.getArgFlags());

    task.data.files.src.forEach(function (file) {
        args.push(file);
    });

    args.push(done);

    exec.apply(this, args);
};

module.exports.description = 'Add file contents to the index.';
