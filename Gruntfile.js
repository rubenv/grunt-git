/*
 * grunt-git
 * https://github.com/rubenv/grunt-git
 *
 * Copyright (c) 2013 Ruben Vermeersch
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        watch: {
            dev: {
                files: ['tasks/*.js', 'lib/*.js', 'test/*.js'],
                tasks: ['jshint', 'test']
            }
        },

        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                'lib/*.js',
                'test/*.js',
                'test/fixtures/*.js'
            ],
            options: {
                jshintrc: '.jshintrc',
            },
        },

        jscs: {
            src: {
                options: {
                    config: '.jscs.json'
                },
                files: {
                    src: [
                        'Gruntfile.js',
                        'tasks/*.js',
                        'lib/*.js',
                        'test/*.js',
                        'test/fixtures/*.js'
                    ],
                }
            },
        },

        mochacli: {
            options: {
                files: 'test/*_test.js'
            },
            spec: {
                options: {
                    reporter: 'spec',
                    timeout: 10000
                }
            }
        },

        bump: {
            options: {
                files: ['package.json'],
                commitFiles: ['-a'],
                pushTo: 'origin'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp'],
        },
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-mocha-cli');
    grunt.loadNpmTasks('grunt-bump');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['jshint', 'jscs', 'clean', 'mochacli']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['test']);

};
