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

#### options.ignoreEmpty
Type: `Boolean`
Default value: `false`

When `true`, the task will not fail when there are no staged changes (optional).

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

## The "gitrebase" task

Rebases the current branch onto another branch

### Options

#### options.branch (required)
Type: `String`
the name of the branch you want to rebase **on to**.  For example if the current branch were `codfish` and you wanted to rebase it onto `master`, you would set this value to `master`.

#### options.theirs
Type: `Boolean`
	Default value: `false`

When true, use the git equivalent of svn's `theirs-conflict` (`--strategy=recursive -Xtheirs`).

### Usage Examples

```js
grunt.initConfig({
  gitrebase: {
    task: {
      options: {
        branch: 'master'
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

Stash the changes in a dirty working directory away.

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

## The "gitclone" task

Clones a git repo.

### Overview
In your project's Gruntfile, add a section named `gitclone` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  gitclone: {
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

#### options.bare
Type: `Boolean`
Default value: none

Run git clone with the `--bare` option applied.

#### options.branch
Type: `String`
Default value: none

Clone the repo with a specific branch checked out. (Cannot be used in conjunction with 'bare')

#### options.repository (required)
Type: `String`
Default value: none

The path to the repository you want to clone.

#### options.directory
Type: `String`
Default value: none

Clone the repo into a specific directory instead of the one git decides.

### Usage Examples

```js
grunt.initConfig({
    gitclone: {
        clone: {
            options: {
                repository: 'https://github.com/you/your-git-repo.git',
                branch: 'my-branch',
                directory: 'repo'
            }
        }
    },
});
```

## The "gitreset" task

Creates a git branch using checkout -b, or checks out a given branch.

### Overview
In your project's Gruntfile, add a section named `gitreset` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  gitreset: {
    your_target: {
      options: {
        // Target-specific options go here.
      },
      files: {
        src: // Target-specific files go here.
      }
    }
  },
})
```

Each target defines a specific git task that can be run. The different available tasks are listed below.

### Options

#### options.mode
Type: `String`
Default value: `''`

The reset mode to run. E.g.: `hard`, `merge`.

#### options.commit
Type: `String`
Default value: `'HEAD'`

Which commit to reset to (optional).

### Usage Examples

```js
grunt.initConfig({
    gitreset: {
        task: {
            options: {
                mode: 'hard',
                commit: 'HEAD~1'
            }
        }
    },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
