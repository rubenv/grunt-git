# grunt-git

> Git commands for grunt.

[![Build Status](https://travis-ci.org/rubenv/grunt-git.png?branch=master)](https://travis-ci.org/rubenv/grunt-git)

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-git --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-git');
```

## The "gitcommit" task

Commits the working directory.

### Overview
In your project's Gruntfile, add a section named `gitcommit` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  gitcommit: {
    your_target: {
      options: {
        // Target-specific options go here.
      },
      files: {
          // Specify the files you want to commit
      }
    }
  },
})
```

Each target defines a specific git task that can be run. The different available tasks are listed below.

### Options

#### options.message
Type: `String`
Default value: `'Commit'`

The commit message.

### Usage Examples

Commit options:

* `message`: Commit message
* `files`: Files to commit

```js
grunt.initConfig({
    gitcommit: {
        task: {
            options: {
                message: 'Testing'
            },
            files: {
                src: ['test.txt']
            }
        }
    },
});
```

## The "gittag" task

Creates a git tag.

### Overview
In your project's Gruntfile, add a section named `gittag` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  gittag: {
    your_target: {
      options: {
        // Target-specific options go here.
      }
    }
  },
})
```

Each target defines a specific git task that can be run. The different available tasks are listed below.

### Options

#### options.tag
Type: `String`
Default value: `''`

The name of the tag. E.g.: `0.0.1`.

#### options.message
Type: `String`
Default value: `''`

The tag message (optional).

### Usage Examples

```js
grunt.initConfig({
    gittag: {
        task: {
            options: {
                tag: '0.0.1',
                message: 'Testing'
            }
        }
    },
});
```

## The "gitcheckout" task

Creates a git branch using checkout -b, or checks out a given branch.

### Overview
In your project's Gruntfile, add a section named `gitcheckout` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  gitcheckout: {
    your_target: {
      options: {
        // Target-specific options go here.
      }
    }
  },
})
```

Each target defines a specific git task that can be run. The different available tasks are listed below.

### Options

#### options.branch
Type: `String`
Default value: `''`

The name of the branch. E.g.: `testing`.

#### options.create
Type: `Boolean`
Default value: `false`

Whether the branch should be created (optional).

### Usage Examples

```js
grunt.initConfig({
    gittag: {
        task: {
            options: {
                branch: 'testing',
                create: true
            }
        }
    },
});
```

## The "gitstash" task

Creates a git branch using checkout -b, or checks out a given branch.

### Overview
In your project's Gruntfile, add a section named `gitstash` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  gitstash: {
    your_target: {
      options: {
        // Target-specific options go here.
      }
    }
  },
})
```

Each target defines a specific git task that can be run. The different available tasks are listed below.

### Options

#### options.command
Type: `String`
Default value: `'save'`

The stash command to run. E.g.: `save`, `apply`.

#### options.stash
Type: `Integer`
Default value: `''`

The stash to apply. E.g.: `0` (optional).

#### options.staged
Type: `Boolean`
Default value: `false`

Whether the staged changes should be reapplied (optional).

### Usage Examples

```js
grunt.initConfig({
    gittag: {
        stash: {
            options: {
                create: true
            }
        },
        apply: {
            options: {
                command: 'apply',
                staged: true,
                stash: '0'
            }
        }
    },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 2013-07-26   v0.1.0   New version, with split commands per task. Bumping minor version due to API breakage.
* 2013-03-07   v0.0.1   Initial version, which commits files. No API stability or anything promised yet.
