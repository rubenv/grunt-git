/*
 * grunt-git
 * https://github.com/rubenv/grunt-git
 *
 * Copyright (c) 2013 Ruben Vermeersch
 * Licensed under the MIT license.
 *
 *//* jshint esversion: 6 */

// jscs and its dependants are far out of date.
//      This file is for archiving purposes only.
module.exports = function ( grunt, options ) {
  return {
    src: {
      options: {
        config: '.conf/.jscs.json'
      },
      files: {
        src: [
            'Gruntfile.js',
            'tasks/*.js',
            'lib/*.js',
            'test/*.js',
            'test/fixtures/*.js'
        ]
      }
    }
  };
};
