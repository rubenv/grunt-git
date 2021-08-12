/*
 * grunt-git
 * https://github.com/rubenv/grunt-git
 *
 * Copyright (c) 2013 Ruben Vermeersch
 * Licensed under the MIT license.
 *
 *//* jshint esversion: 6 */

const path     = require('path');

module.exports = function ( grunt, options ) {
  const builddir = path.join(process.cwd(), options.BUILDDIR);
  return {
    npm_pack:  {
      options: {
        execOptions: {
          cwd: options.DISTDIR
        }
      },
      command: `npm pack ${builddir}`
    }
  }
};
