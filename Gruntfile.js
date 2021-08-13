/*
 * grunt-git
 * https://github.com/rubenv/grunt-git
 *
 * Copyright (c) 2013 Ruben Vermeersch
 * Licensed under the MIT license.
 *
 *//* jshint esversion: 6 */
'use strict';

const path         = require('path');
const GRUNTCONFDIR = path.join(process.cwd(), '.conf', 'grunt');

const env = {
  BUILDDIR: 'build', DISTDIR: 'dist',   DOCSDIR: 'docs',
  LIBDIR:   'lib',   TASKSDIR: 'tasks', TMPDIR:  'tmp'
};

module.exports = function (grunt) {

  require('load-grunt-config')(grunt, {configPath: GRUNTCONFDIR, data: env});
  require('load-grunt-tasks' )(grunt);

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');


  // Build npm package
  grunt.registerTask('build',    ['clean:build',    'mkdir:build', 'copy:build',
                                  'jsonfile:build', 'shell:npm_pack']);

  // By default, clean, lint, test, build and package
  grunt.registerTask('default',  ['test', 'build']);

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test',     ['clean:tests', 'jshint', 'nyc_mocha']);

};
