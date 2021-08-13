# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]
All changes focused on adjusting the build process. This release
does not need to be reflected by publishing a package on npm.

### Added
- added grunt plugins for automated build process
- added .conf/grunt/*.js
- added CHANGELOG.md

### Changed
- changed build process - simply call grunt to test and distribute
- moved .jscs.json to .conf/
- grunt build environment
  - added load-grunt-config
  - added load-grunt-tasks

### Removed
- grunt-jscs to many dependencies to packages no longer supported
  - nomnom@1.8.1: Package no longer supported
  - jscs-preset-wikimedia@1.0.1: No longer maintained.
  - core-js@2.6.12: core-js@<3.3 is no longer maintained and not
    recommended for usage due to the number of issues.


### Fixed
- No fixes yet

## [1.1.1] - 2021-08-11

Updated package.json devDependencies to reflect recent grunt version
