'use strict';

var command = require('../lib/commands').remote;
var Test = require('./_common');

describe('remote', function () {
    it('remote --verbose', function (done) {
        var options = {
            verbose: true
        };

        new Test(command, options)
            .expect(['remote', '--verbose'])
            .run(done);
    });

    it('remote add upstream remote_uri', function (done) {
        var options = {
            add: { name: 'upstream', url: 'remote_uri' }
        };

        new Test(command, options)
            .expect(['remote', 'add', 'upstream', 'remote_uri'])
            .run(done);
    });

    it('remote add -t branch -f --tags --mirror=fetch upstream remote_uri', function (done) {
        var options = {
            add: { name: 'upstream', url: 'remote_uri' },
            t: 'master',
            f: true,
            tags: true,
            mirror: 'fetch'
        };

        new Test(command, options)
            .expect(['remote', 'add', '-t', 'master', '-f', '--tags', '--mirror=fetch', 'upstream', 'remote_uri'])
            .run(done);
    });

    it('remote rename old new', function (done) {
        var options = {
            rename: { old: 'oldremote', new: 'newremote' }
        };

        new Test(command, options)
            .expect(['remote', 'rename', 'oldremote', 'newremote'])
            .run(done);
    });

    it('remote remove remote_uri', function (done) {
        var options = {
            remove: 'remote_uri'
        };

        new Test(command, options)
            .expect(['remote', 'remove', 'remote_uri'])
            .run(done);
    });

    it('remote set-head name', function (done) {
        var options = {
            sethead: 'name'
        };

        new Test(command, options)
            .expect(['remote', 'set-head', 'name'])
            .run(done);
    });

    it('remote set-head name --auto', function (done) {
        var options = {
            sethead: 'name',
            auto: true
        };

        new Test(command, options)
            .expect(['remote', 'set-head', 'name', '--auto'])
            .run(done);
    });

    it('remote set-head name --delete', function (done) {
        var options = {
            sethead: 'name',
            delete: true
        };

        new Test(command, options)
            .expect(['remote', 'set-head', 'name', '--delete'])
            .run(done);
    });

    it('remote set-head name branch', function (done) {
        var options = {
            sethead: 'name',
            branch: 'branch'
        };

        new Test(command, options)
            .expect(['remote', 'set-head', 'name', 'branch'])
            .run(done);
    });

    it('remote set-branches name branch', function (done) {
        var options = {
            setbranches: { name: 'name', branch: 'branch' }
        };

        new Test(command, options)
            .expect(['remote', 'set-branches', 'name', 'branch'])
            .run(done);
    });

    it('remote set-branches --add name branch', function (done) {
        var options = {
            setbranches: { name: 'name', branch: 'branch' },
            add: true
        };

        new Test(command, options)
            .expect(['remote', 'set-branches', '--add', 'name', 'branch'])
            .run(done);
    });

    it('remote get-url name', function (done) {
        var options = {
            geturl: 'upstream'
        };

        new Test(command, options)
            .expect(['remote', 'get-url', 'upstream'])
            .run(done);
    });

    it('remote get-url --push --all name', function (done) {
        var options = {
            geturl: 'upstream',
            push: true,
            all: true
        };

        new Test(command, options)
            .expect(['remote', 'get-url', '--push', '--all', 'upstream'])
            .run(done);
    });

    it('remote set-url name newurl', function (done) {
        var options = {
            seturl: { name: 'name', url: 'newurl' }
        };

        new Test(command, options)
            .expect(['remote', 'set-url', 'name', 'newurl'])
            .run(done);
    });

    it('remote set-url name newurl oldurl', function (done) {
        var options = {
            seturl: { name: 'name', url: 'newurl', oldurl: 'oldurl' }
        };

        new Test(command, options)
            .expect(['remote', 'set-url', 'name', 'newurl', 'oldurl'])
            .run(done);
    });

    it('remote set-url --push name newurl oldurl', function (done) {
        var options = {
            seturl: { name: 'name', url: 'newurl', oldurl: 'oldurl' },
            push: true
        };

        new Test(command, options)
            .expect(['remote', 'set-url', '--push', 'name', 'newurl', 'oldurl'])
            .run(done);
    });

    it('remote set-url --add name newurl', function (done) {
        var options = {
            seturl: { name: 'name', url: 'newurl' },
            add: true
        };

        new Test(command, options)
            .expect(['remote', 'set-url', '--add', 'name', 'newurl'])
            .run(done);
    });

    it('remote set-url --delete name newurl', function (done) {
        var options = {
            seturl: { name: 'name', url: 'newurl' },
            delete: true
        };

        new Test(command, options)
            .expect(['remote', 'set-url', '--delete', 'name', 'newurl'])
            .run(done);
    });

    it('remote show name', function (done) {
        var options = {
            show: 'name'
        };

        new Test(command, options)
            .expect(['remote', 'show', 'name'])
            .run(done);
    });

    it('remote show -n name', function (done) {
        var options = {
            show: 'name',
            n: true
        };

        new Test(command, options)
            .expect(['remote', 'show', '-n', 'name'])
            .run(done);
    });

    it('remote prune name', function (done) {
        var options = {
            prune: 'name'
        };

        new Test(command, options)
            .expect(['remote', 'prune', 'name'])
            .run(done);
    });

    it('remote update origin upstream', function (done) {
        var options = {
            update: ['origin', 'upstream']
        };

        new Test(command, options)
            .expect(['remote', 'update', 'origin', 'upstream'])
            .run(done);
    });

    it('remote update --prune origin upstream', function (done) {
        var options = {
            update: ['origin', 'upstream'],
            prune: true
        };

        new Test(command, options)
            .expect(['remote', 'update', '--prune', 'origin', 'upstream'])
            .run(done);
    });
});
