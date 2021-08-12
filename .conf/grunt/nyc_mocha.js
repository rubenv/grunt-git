/**
 *  grunt-git
 *  https://github.com/rubenv/grunt-git
 *
 *  © 2020, db developer.
 *  Licensed under the MIT license.
 *
 *//* jshint esversion: 6 */

module.exports = function ( grunt, options ) {
  return {
    test_and_coverage: {
      src: `./test/**/*_test.js`,                     // test suite to run...
      options: {
        nyc: {
          coverage: {                                 // report nyc coverage results
            dir:          "dist/coverage",            // ... to folder
            reporter:     [                           // ... using reporters
                            "html", "json", "lcov",
                            "text-summary"
                          ],
            check:        true,
            perfile:      true,
            branches:     100,
            functions:    100,
            lines:        100,
            statements:   100
          },
          excludes:       [ "gruntfile.js", ".conf/**/*.js", "test/**/*.js" ],
          requires:       [ "grunt-nyc-mocha/scripts/sourcemapsupport" ]
        },
        mocha: {
          color:          true                        // force colored output
        }
      }
    }
  };
};
