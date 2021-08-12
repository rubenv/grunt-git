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
      files: [
        {
          src:      [ "*.md", "LICENSE" ],
          dest:     `${ options.BUILDDIR }/`
        },{
          src:      [ `${ options.TASKSDIR }/*.js` ],
          dest:     `${ options.BUILDDIR }/`
        },{
          src:      [ `${ options.LIBDIR }/*.js` ],
          dest:     `${ options.BUILDDIR }/`
        }
      ]
    }
  };
};
