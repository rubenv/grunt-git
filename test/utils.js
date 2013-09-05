'use strict';

var grunt = require('grunt');

module.exports = {

    handleSpawnOutput : function handleSpawnOutput(command, args, cb) {
        return function (err, result) {
            if (!err) {
                cb();
            } else {
                cb(new Error(command  + JSON.stringify(args) + ': ' + JSON.stringify(result)));
            }
        };
    },

    runCommand : function runCommand(folder, command, args, cb) {
        grunt.util.spawn({
            cmd: command,
            args: args,
            opts: {
                cwd: folder
            }
        }, this.handleSpawnOutput(command, args, cb));
    },

    genCommand : function genCommand(folder, command, args) {
        var that = this;
        return function (cb) {
            that.runCommand(folder, command, args, cb);
        };
    }
};
