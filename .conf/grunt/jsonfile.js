/**
 *  grunt-git
 *  https://github.com/rubenv/grunt-git
 *
 *  © 2020, db developer.
 *    https://www.npmjs.com/package/grunt-nyc-mocha
 *
 *  Licensed under the MIT license.
 *
 *//* jshint esversion: 6 */

module.exports = function ( grunt, options ) {
  return {
    options: {
      EOF:  true,
      templates: {
        pkgjson:  "package.json"
      }
    },
    build: {
      template:   "pkgjson",
      dest:       `${ options.BUILDDIR }/package.json`,
      merge: {
        "scripts":          undefined,
        "devDependencies":  undefined
      }
    }
  };
};
