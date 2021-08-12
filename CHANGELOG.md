# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- added .conf/grunt/*.js
- added CHANGELOG.md

### Changed
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
