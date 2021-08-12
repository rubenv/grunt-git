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

module.exports = function (grunt) {

  require('load-grunt-config')(grunt, {configPath: GRUNTCONFDIR});
  require('load-grunt-tasks' )(grunt);

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');


  // By default, lint and run all tests.
  grunt.registerTask('default', ['test']);

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'jshint', 'nyc_mocha']);

};
