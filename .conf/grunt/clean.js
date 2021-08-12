/*
 * grunt-git
 * https://github.com/rubenv/grunt-git
 *
 * Copyright (c) 2013 Ruben Vermeersch
 * Licensed under the MIT license.
 *
 *//* jshint esversion: 6 */

module.exports = function ( grunt, options ) {
  return {
    build: {
      src: [options.BUILDDIR, options.TMPDIR]
    },
    tests: {
      src: [options.DISTDIR,  options.TMPDIR]
    }
  };
};
