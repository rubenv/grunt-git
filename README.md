# grunt-git

> Git commands for grunt.

[![Build Status](https://travis-ci.org/rubenv/grunt-git.png?branch=master)](https://travis-ci.org/rubenv/grunt-git)

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-git --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-git');
```

### Upgrading from v0.2.x
The `gitcommit` command used to call `git add` for you. This is no longer the case. Be sure to add a `gitadd` task whenever there might be new files to commit. The `ignoreEmpty` option is no longer supported.

## Universal options
The following options may be applied to any task

#### options.verbose
Type: `boolean`
Default value: `none`

Console output from the git task will be piped to the output of the grunt script. Useful for debugging.

#### options.cwd
Type: `string`
Default value: `none`

Change the current working directory before executing the git call. Useful for performing operations on repositories that are located in subdirectories.
**Note:** When performing commands that provide files (e.g. gitcommit), it is also necessary to specify the ``cwd`` for the files explicitly.

#### Example:
```js
grunt.initConfig({
  gitcommit: {
    your_target: {
      options: {
        cwd: "/path/to/repo"
      },
      files: [
        {
          src: ["fileone.txt", "filetwo.js"],
          expand: true,
          cwd: "/path/to/repo"
        }
      ]
    }
  },
})
```

## The "gitadd" task

Add file contents to the index

### Options

#### options.all
Type: `Boolean`
Default value: `false`

Update the index not only where the working tree has a file matching <pathspec> but also where the
index already has an entry. This adds, modifies, and removes index entries to match the working tree.

#### options.force
Type: `Boolean`
Default value: `false`

Allow adding otherwise ignored files.

### Usage Examples

```js
grunt.initConfig({
  gitadd: {
    task: {
      options: {
        force: true
      },
      files: {
        src: ['test.txt']
      }
    }
  },
});
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

#### options.description
Type: `String`
Default value: `false`

The commit description.

#### options.allowEmpty
Type: `Boolean`
Default value: `false`

When `true`, the task will not fail when there are no staged changes (optional).

#### options.noVerify
Type: `Boolean`
Default value: `false`

When `true`, the task will commit the changes with the `--no-verify` flag.

#### options.noStatus
Type: `Boolean`
Default value: `false`

When `true`, the task will commit the changes with the `--no-status` flag.

### Usage Examples

Commit options:

* `message`: Commit message
* `files`: Files to commit
* `noVerify`: Bypass the pre-commit and commit-msg hooks when committing changes
* `noStatus`: Do not include the output of `git-status` in the commit message

```js
grunt.initConfig({
    gitcommit: {
        task: {
            options: {
                message: 'Testing',
                noVerify: true,
                noStatus: false
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

Creates (or deletes) a git tag.

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

#### options.remove
Type: `Boolean`
Default value: `false`

Whether to delete the tag (optional).

#### options.annotated
Type: `Boolean`
Default value: `false`

Whether to create an annotated tag (optional).

#### options.force
Type: `Boolean`
Default value: `false`

Whether to force to create or update the tag (optional).

### Usage Examples

```js
grunt.initConfig({
    gittag: {
        addtag: {
            options: {
                tag: '0.0.1',
                message: 'Testing'
            }
        },
        deletetag: {
            options: {
                tag: '0.0.1',
                remove: true
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

#### options.force
Type: `Boolean`
Default value: `false`

Whether the checkout should be forced in the case of git errors (optional)

#### options.overwrite
Type: `Boolean`
Default value: `false`

Whether the branch should be overwritten, or created if it doesn't already exist (optional).

**NOTE:** When enabled, this option overwrites the target branch with the current branch.

### Usage Examples

```js
grunt.initConfig({
    gitcheckout: {
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

#### options.depth
Type: `Integer`
Default value: none

Clone the repo with a limited revision history. (Such clones cannot be pushed from or pulled to.)

#### options.repository (required)
Type: `String`
Default value: none

The path to the repository you want to clone.

#### options.directory
Type: `String`
Default value: none

Clone the repo into a specific directory instead of the one git decides.

#### options.recursive
Type: `boolean`
Default value: none

Pass the --recursive flag to the git clone command. This is equivalent to running git submodule update --init --recursive immediately after the clone is finished.

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
## The "gitrm" task

Removes files from git's working tree and index.

### Overview
In your project's Gruntfile, add a section named `gitrm` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  gitrm: {
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

#### options.force
Type: `boolean`
Default value: `false`

Will force a removal of the files listed in the configuration.

#### options.recurse
Type: `boolean`
Default value: `false`

Will recurse into subdirectories if specified in the configuration.

### Usage Examples

```js
grunt.initConfig({
    gitrm: {
        task: {
            options: {
                force: 'true'
            },
            files: {
                src: ['dist/test.min.js']
            }
        }
    },
});
```

## The "gitclean" task

Remove untracked files from the working tree.

### Overview
In your project's Gruntfile, add a section named `gitclean` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  gitclean: {
    your_target: {
      options: {
        // Target-specific options go here.
      },
      files: {
        src: // Target-specific paths go here (optional).
      }
    }
  },
})
```

### Options

#### options.force
Type: `Boolean`
Default value: `true`

Force a run of the clean command (optional).

#### options.dry
Type: `Boolean`
Default value: `false`

Don't actually remove anything, just show what would be done (optional).

#### options.quiet
Type: `Boolean`
Default value: `false`

Be quiet, only report errors, but not the files that are successfully removed (optional).

#### options.exclude
Type: `String`
Default value: `false`

In addition to those found in .gitignore (per directory) and $GIT_DIR/info/exclude, also consider the given patterns to be in the set of the ignore rules in effect (optional).

#### options.onlyignorefiles
Type: `Boolean`
Default value: `false`

Remove only files ignored by Git. This may be useful to rebuild everything from scratch, but keep manually created files (optional).

#### options.nonstandard
Type: `Boolean`
Default value: `false`

Don't use the standard ignore rules read from .gitignore (per directory) and $GIT_DIR/info/exclude, but do still use the ignore rules given with this option. This allows removing all untracked files, including build products. This can be used (possibly in conjunction with git reset) to create a pristine working directory to test a clean build (optional).

#### options.directories
Type: `Boolean`
Default value: `false`

Remove untracked directories in addition to untracked files. If an untracked directory is managed by a different Git repository, it is not removed by default (optional).

## The "gitpush" task

Pushes to a remote.

### Overview
In your project's Gruntfile, add a section named `gitpush` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  gitpush: {
    your_target: {
      options: {
        // Target-specific options go here.
      }
    }
  },
})
```

### Options

#### options.remote
Type: `String`
Default value: `'origin'`

The remote where to push. E.g.: `origin`, `heroku`. The task will push to `origin` if left unset.

#### options.branch
Type: `String`
Default value: `null`

The remote branch to push to. E.g.: `master`, `develop`. The task will push to the tracked branch if left unset.

#### options.all
Type: `Boolean`
Default value: `false`

Will add the `--all` flag to the push.

#### options.tags
Type: `Boolean`
Default value: `false`

Will add the `--tags` flag to the push.

#### options.upstream
Type: `Boolean`
Default value: `false`

Will add the `--set-upstream` flag to the push.

#### options.force
Type: `Boolean`
Default value: `false`

Will add the `--force` flag to the push.

## The "gitpull" task

Pulls from a remote.

### Overview
In your project's Gruntfile, add a section named `gitpull` to the data object passed into `grunt.initConfig()`.
You can change the remote (origin is by default), and you can add a branch you want to pull from.

```js
grunt.initConfig({
  gitpull: {
    your_target: {
      options: {

      }
    }
  },
})
```

### Options

#### options.remote
Type: `String`
Default value: `origin`

The remote to pull from. The task will not fail if the origin is left unset and pull the default remote git origin.

#### options.branch
Type: `String`
Default value: `master`

The branch to pull from. E.g.: `master`, `develop` (optional).

## The "gitfetch" task

Download objects and refs from a repo.

### Overview

In your project's Gruntfile, add a section named `gitfetch` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  gitfetch: {
    your_target: {
      options: {
        all: true
      }
    }
  }
})
```

### Options

#### options.repository
Type: `String`
Default value: `null`

The repository you want to fetch from. When no remote is specified, by default the origin remote will be used.

#### options.all
Type: `Boolean`
Default value: `false`

Adds the `--all` flag. Fetch all remotes.

#### options.append
Type: `Boolean`
Default value: `false`

Adds the `--append` flag. Append ref names and object names of fetched refs.

#### options.prune
Type: `Boolean`
Default value: `false`

Adds the `--prune` flag. After fetching, remove any remote-tracking references that no longer exist on the remote.

#### options.notags
Type: `Boolean`
Default value: `false`

Adds the `--no-tags` flag. Disables automatic tag following.

#### options.tags
Type: `Boolean`
Default value: `false`

Adds the `--tags` flag. Fetch all tags from the remote into local.

## The "gitmerge" task

Merges another branch into the current branch.

### Overview
In your project's Gruntfile, add a section named `gitmerge` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  gitmerge: {
    your_target: {
      options: {
        // Target-specific options go here.
      }
    }
  },
})
```

### Options

#### options.branch
Type: `String`
Default value: `null`

The branch to merge from. E.g.: `master`, `develop`. The task will fail if the branch if left unset.

#### options.ffOnly
Type: `Boolean`
Default value: `false`

Will add the `--ff-only` flag to the merge.

#### options.noff
Type: `Boolean`
Default value: `false`

Will add the `--no-ff` flag to the merge.

#### options.squash
Type: `Boolean`
Default value: `false`

Will add the `--squash` flag to the merge.

#### options.edit
Type: `Boolean`
Default value: `false`

Will add the `--edit` flag to the merge: this forces an editor to appear before committing the successful merge.

#### options.noEdit
Type: `Boolean`
Default value: `false`

Will add the `--no-edit` flag to the merge: this bypasses the editor from appearing before committing a successful merge.

#### options.message
Type: `String`
Default value: `null`

Will add the `-m` flag followed by the value of this option to the merge: this string will be used as the commit message for the merge.

#### options.commit
Type: `Boolean`
Default value: `false`

Will add the `--commit` flag to the merge: this option can be used to override ``-no-commit`` in the git config.

#### options.noCommit
Type: `Boolean`
Default value: `false`

Will add the `--no-commit` flag to the merge: do not commit the merge.

#### options.strategy
Type: `String`
Default value: `null`

Will add the `-s` flag followed by the value of this option to the merge: this string will be used to specify the strategy for the merge.

#### options.strategyOption
Type: `String`
Default value: `null`

Will add the `-X` flag followed by the value of this option to the merge: this string will be used to specify a strategy-specific option for the merge.

## The "gitarchive" task

Archives a branch.

### Overview

In your project's Gruntfile, add a section named `gitarchive` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  gitarchive: {
    master: {
      options: {
        format: 'tar.gz',
        prefix: 'your-project-name/',
        treeIsh: 'master',
        output: '/tmp/your-project-name.tar.gz',
        path: ['README', 'LICENSE']
      }
    }
  }
})
```

### Options

#### options.treeIsh
Type: `String`
Default value: `'master'`.

The tree or commit to produce an archive for. E.g.: `'master'` or a commit hash.

#### options.format
Type: `String`
Default value: `'tar'`.

Format of the resulting archive: `'tar'`, `'tar.gz'`, `'zip'`. If this option is not given, and the output file is specified, the format is inferred from the filename if possible (e.g. writing to "foo.zip" makes the output to be in the zip format). Otherwise the output format is tar.

#### options.prefix
Type: `String`
Default value: none.

Adds the `--prefix` flag. Don't forget the trailing `/`.

#### options.output
Type: `String`
Default value: none.

Adds the `--output` flag. Write the archive to a file instead of `stdout`.

#### options.remote
Type: `String`
Default value: none.

Adds the `--remote` flag. Instead of making a tar archive from the local repository, retrieve a tar archive from a remote repository.

#### options.path
Type: `Array`
Default value: none.

Without an optional `path` parameter, all files and subdirectories of the current working directory are included in the archive. If one or more paths are specified, only these are included.


## The "gitlog" task

Logs commit history and stores the result in a grunt property or calls a callback function with the result. The result is an array of objects with the following properties:

* `hash` - the commit hash
* `author` - an object with `name` and `email` properties
* `date` - the date of the commit
* `subject` - the subject string of the commit
* `body` - the body string of the commit

### Overview

In your project's Gruntfile, add a section named `gitlog` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  gitlog: {
    mytarget: {
      options: {
        prop: 'gitlog.mytarget.result',
        from: 'v0.2.0',
        to: 'v0.2.2'
      }
    }
  }
})
```

### Options

#### options.prop
Type: `String`
Default value: `'gitlog.<target name>.result'`.

The grunt property in which to store the results.

#### options.callback
Type: `Function`
Default value: none.

A callback function to call with the log results.

#### options.pretty
Type: `String`
Default value: 
```
    'format:' + 
    '{%n' +
    '  "hash": "%H",%n' + // commit hash
    '  "author": {%n' +
    '    "name": "%an",%n' + // author
    '    "email": "%ae"%n' + // email
    '  },%n' +
    '  "date": "%aD",%n' + // date
    '  "subject": "%s",%n' + // subject
    '  "body": "%b"%n' + // body
    '}%n' +
    '--grunt-gitlog-separator--' // separator
```

The format for the log output

#### options.number
Type: `Int`
Default value: none.

The number of logs entries to export

#### options.from
Type: `String`
Default value: none.

A commit hash, tag, etc to start from.

#### options.to
Type: `String`
Default value: none.

A commit hash, tag, etc to end at. Defaults to `'HEAD'` if `from` is specified.

#### options.dateOrder
Type: `Boolean`
Default value: none.

Whether to order by date. Defaults to true when `options.after` or `options.before` are specified.

#### options.after
Type: `Date`
Default value: none.

A date to start from. Causes `options.dateOrder` to be true

#### options.before
Type: `Date`
Default value: none.

A date to stop at. Causes `options.dateOrder` to be true

#### options.noMerges
Type: `boolean`
Default value: true.

Whether or not to include merges in the logs.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
