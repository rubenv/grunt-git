# grunt-git

> Git commands for grunt.

[![Build Status](https://travis-ci.org/rubenv/grunt-git.png?branch=master)](https://travis-ci.org/rubenv/grunt-git)

## Getting Started

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
Type: `Boolean`
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
Type: `Boolean`
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
Type: `Boolean`
Default value: `false`

Will force a removal of the files listed in the configuration.

#### options.recurse
Type: `Boolean`
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
Type: `String`/`Array`
Default value: `false`

In addition to those found in .gitignore (per directory) and $GIT_DIR/info/exclude, also consider the given patterns to be in the set of the ignore rules in effect (optional).

In case it's needed to provide multiple patterns one should use an array:

```js
grunt.initConfig({
  gitclean: {
    your_target: {
      options: {
        exclude: ['.env', 'config.php']
      },
      ...
    }
  },
})
```

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

## The "gitrevParse" task

Pick out and massage parameters.

### Overview

In your project's Gruntfile, add a section named `gitrevParse` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  gitrevParse: {
    your_target: {
      options: {
        short: 7,
        treeIsh: 'master',
        prop: 'gitrevParse.your_target.result',
        callback: function(result) {
          grunt.gitrevParse.your_target.result = result;
        }
      }
    }
  }
})
```

### Options

#### options.short
Type: `Integer`
Default value: none.

Adds the `--short=` option, set to the specified number of characters.

#### options.treeIsh
Type: `String`
Default value: `'HEAD'`

The tree or commit object to examine.

#### options.abbrevRef
Type: `Boolean`
Default value: `false`

Adds the `--abbrev-ref` flag. Try and output the abbreviated reference for the tree-ish object instead of the SHA-1 checksum.

#### options.prop
Type: `String`
Default value: `'gitrevParse.<target name>.result'`.

The grunt property in which to store the results.

#### options.callback
Type: `Function`
Default value: none.

A callback function that is called with the rev-parse results provided as the sole parameter.

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

#### options.nolog
Type: `Boolean`
Default value: `false`

Will add the `--no-log` flag to the merge.

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
Type: `Boolean`
Default value: true.

Whether or not to include merges in the logs.

## The "gitapply" task

Applies a patch (or a series of patches) to your cwd

### Overview

In your project's Gruntfile, add a section named `gitapply` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  gitapply: {
    mytarget: {
      options: {
        patchFiles: './myFile.patch',
      }
    }
  }
})
```

### Options

#### options.patchFiles
type: `String`
default value: none.

String (can be a glob), representing the path to the patch files you want to apply

#### options.stat
Type: `Boolean`
Default value: none

Rather than actually applying the patch, outputs a diffstat to your optional `callback`.
Will not apply your patch by default - override by setting `options.apply` to true

#### options.numstat
Type: `Boolean`
Default value: none

Similar to `options.stat`, but shows the number of added and deleted lines in decimal notation and the pathname without abbreviation, to make it more machine friendly. For binary files, outputs two - instead of saying 0 0.
Will not apply your patch by default - override by setting `options.apply` to true

#### options.summary
Type: `Boolean`
Default value: none

Instead of applying the patch, output a condensed summary of information obtained from git diff extended headers, such as creations, renames and mode changes.
Will not apply your patch by default - override by setting `options.apply` to true

#### options.check
Type: `Boolean`
Default value: none

Instead of applying the patch, see if the patch is applicable to the current working tree and/or the index file and detects errors.
Will not apply your patch by default - override by setting `options.apply` to true

#### options.index
type: `Boolean`
default value: none

when `options.check` is in effect, or when applying the patch (which is the default when none of the options that disables it is in effect), make sure the patch is applicable to what the current index file records. if the file to be patched in the working tree is not up-to-date, it is flagged as an error. this flag also causes the index file to be updated.

#### options.threeway
type: `Boolean`
default value: none

When the patch does not apply cleanly, fall back on 3-way merge if the patch records the identity of blobs it is supposed to apply to, and we have those blobs available locally, possibly leaving the conflict markers in the files in the working tree for the user to resolve. This option implies `options.index`, and is incompatible with `options.reject` and `options.cached`.

#### options.reverse
type: `Boolean`
default value: none

Apply the patch in reverse.

#### options.reject
type: `Boolean`
default value: none

For atomicity, git apply by default fails the whole patch and does not touch the working tree when some of the hunks do not apply. This option makes it apply the parts of the patch that are applicable, and leave the rejected hunks in corresponding `*.rej` files.

### options.numStatKeepPathNames
type: `Boolean`
default value: none

When `options.numstat` has been given, do not munge pathnames, but use a NUL-terminated machine-readable format.
Without this option, each pathname output will have TAB, LF, double quotes, and backslash characters replaced with `\t`, `\n`, `\"`, and `\\`, respectively, and the pathname will be enclosed in double quotes if any of those replacements occurred.

### options.removeLeadingSlashes
type: `int`
default value: none

Removes the number of leading slashes from traditional diff paths as you give in the options (e.g. `{p: 10}` means remove 10).

### options.ensureContextMatch
type: `int`
default value: none

Ensure at least the number of lines given in the config of surrounding context match before and after each change. When fewer lines of surrounding context exist they all must match. By default no context is ever ignored.

### options.unidiffZero
type: `Boolean`
default value: none

By default, git apply expects that the patch being applied is a unified diff with at least one line of context. This provides good safety measures, but breaks down when applying a diff generated with --unified=0. To bypass these checks use `options.unidiffZero`.

### options.apply
type: `Boolean`
default value: none

If you use any of the options marked "Turns off apply" above, git apply reads and outputs the requested information without actually applying the patch. Give this flag after those flags to also apply the patch.

### options.noAdd
type: `Boolean`
default value: none

When applying a patch, ignore additions made by the patch. This can be used to extract the common part between two files by first running diff on them and applying the result with this option, which would apply the deletion part but not the addition part.

### options.exclude
type: `String`
default value: none

Don’t apply changes to files matching the given path pattern. This can be useful when importing patchsets, where you want to exclude certain files or directories.

### options.include
type: `String`
default value: none

Apply changes to files matching the given path pattern. This can be useful when importing patchsets, where you want to include certain files or directories.

### options.ignoreSpaceChange
type: `Boolean`
default value: none

When applying a patch, ignore changes in whitespace in context lines if necessary. Context lines will preserve their whitespace, and they will not undergo whitespace fixing regardless of the value of this option. New lines will still be fixed, though.

### options.ignoreWhitespace
type: `Boolean`
default value: none

Alias value for `options.ignoreSpaceChang`

### options.whitespace
type: `String`
default value: none

When applying a patch, detect a new or modified line that has whitespace errors. What are considered whitespace errors is controlled by `core.whitespace` configuration. By default, trailing whitespaces (including lines that solely consist of whitespaces) and a space character that is immediately followed by a tab character inside the initial indent of the line are considered whitespace errors.

By default, the command outputs warning messages but applies the patch. When git-apply is used for statistics and not applying a patch, it defaults to nowarn.

You can use different values to control this behavior:

- `nowarn` turns off the trailing whitespace warning.
- `warn` outputs warnings for a few such errors, but applies the patch as-is (default).
- `fix` outputs warnings for a few such errors, and applies the patch after fixing them (strip is a synonym --- the tool used to consider only trailing whitespace characters as errors, and the fix involved stripping them, but modern Gits do more).
- `error` outputs warnings for a few such errors, and refuses to apply the patch.
- `error-all` is similar to error but shows all errors.

The output is made available via `options.callback`

### options.inaccurateEOF
type: `Boolean`
default value: none

Under certain circumstances, some versions of diff do not correctly detect a missing new-line at the end of the file. As a result, patches created by such diff programs do not record incomplete lines correctly. This option adds support for applying such patches by working around this bug.

### options.recount
type: `Boolean`
default value: none

Do not trust the line counts in the hunk headers, but infer them by inspecting the patch (e.g. after editing the patch without adjusting the hunk headers appropriately).

### options.directory
type: `String`
default value: none

Prepend the value you assign to `options.directory` to all filenames. If a `options.removeLeadingSlashes`  also set, it is applied before prepending the new root.

For example, a patch that talks about updating `a/git-gui.sh` to `b/git-gui.sh` can be applied to the file in the working tree `modules/git-gui/git-gui.sh` by setting `{ directory: "modules/git-gui" }`.

### options.unsafePaths
type: `Boolean`
default value: none

By default, a patch that affects outside the working area (either a Git controlled working tree, or the current working directory when "git apply" is used as a replacement of GNU patch) is rejected as a mistake (or a mischief).

#### options.callback
type: `function`
default value: none.

a callback function to call with the log results.

#### options.noWalk
Type: `Boolean`
Default value: false.

Only show the given commits, and do no traverse their ancestors. Has NO effect if `to` or `from` is also specified.

#### options.tags
Type: `Boolean`
Default value: false.

Only list all tagged commits

## The "gitstatus" task

Fetches the git status, storing the result in a grunt property, and/or calling a callback function with the result.

The result is a list of objects, each with the following properties:

* `file` - the indicated filename.
* `code` - a two letter code indicating the status of the file.
* `descr` - a short description of the status.

In some cases there is an additional property, `alt_file`, for example if the file has been renamed.

Here's an example result:

```js
[ { code: 'R ', file: 'from',                descr: 'renamed in index',
        alt_file: 'to'
        },
  { code: '??', file: 'untracked_file.txt',  descr: 'untracked' },
  { code: 'A ', file: 'new_file.txt',        descr: 'added to index' },
  { code: 'D ', file: 'deprecated_file.txt', descr: 'deleted from index' },
  { code: 'AA', file: 'popular_file.txt',    descr: 'unmerged, both added' },
  { code: '!!', file: 'node_modules/',       descr: 'ignored' }
]
```

Note that ignored files will only be included if the `includeIgnored` option is set (see below).

For full details on all the possible codes, please see the [git status documentation](https://git-scm.com/docs/git-status#_output).



### Overview

In your project's Gruntfile, add a section named `gitstatus` to the data object passed into `grunt.initConfig()`.

Properties `prop` and `callback` are both optional, though not using at least one is pointless.

```js
grunt.initConfig({
    gitstatus: {
        mytarget: {
            options: {
                prop:     'gitstatus.mytarget.result',
                callback: function (result) { ... },
            },
        },
    },
})
```

### Options

#### options.prop
Type: `String`
Default value: `'gitstatus.<target name>.result'`.

The grunt property in which the result is stored.

#### options.callback
Type: `Function`
Default value: none

A callback function to call with the result.

#### options.includeIgnored
Type: `Boolean`
Default value: `false`

If set to true, files ignored by git (in .gitignore for example) are included in the results with a code of "!!".

## The "gitdescribe" task

The command finds the most recent tag that is reachable from a commit. If the tag points to the commit, then only the tag is shown. Otherwise, it suffixes the tag name with the number of additional commits on top of the tagged object and the abbreviated object name of the most recent commit. The result is a "human-readable" object name which can also be used to identify the commit to other git commands.

#### options.all
Type: `Boolean`  
Default value: false

Instead of using only the annotated tags, use any ref found in refs/ namespace. This option enables matching any known branch, remote-tracking branch, or lightweight tag.

#### options.tags
Type: `Boolean`  
Default value: false

Instead of using only the annotated tags, use any tag found in refs/tags namespace. This option enables matching a lightweight (non-annotated) tag.

#### options.contains
Type: `Boolean`  
Default value: false

Instead of finding the tag that predates the commit, find the tag that comes after the commit, and thus contains it. Automatically implies --tags.

#### options.abbrev
Type: `Integer`  
Default value: 7

Instead of using the default 7 hexadecimal digits as the abbreviated object name, use <n> digits, or as many digits as needed to form a unique object name. An <n> of 0 will suppress long format, only showing the closest tag.

#### options.candidates
Type: `Integer`  
Default value: 10

Instead of considering only the 10 most recent tags as candidates to describe the input commit-ish consider up to <n> candidates. Increasing <n> above 10 will take slightly longer but may produce a more accurate result. An <n> of 0 will cause only exact matches to be output.

#### options.commit-ish
Type: `String`  
Default value: "HEAD"

Commit-ish object names to describe. Defaults to HEAD if omitted.

#### options.callback
Type: `Function`
Default value: none

A callback function to call with the result.

### Usage Examples

```js
grunt.initConfig({
    gitdescribe: {
        latest: {
            options: {
                abbrev: 0,
                callback: function (result) { ... },
            }
        }
    },
});
```

For full details on all the possible codes, please see the [git describe documentation](https://git-scm.com/docs/git-describe).

## The "gitremote" task

Manage the set of repositories ("remotes") whose branches you track.

#### options.verbose
Type: `Boolean`  
Default value: false

Be a little more verbose and show remote url after name.

#### options.add
Type: `Object`  
Default value: undefined

Adds a remote named \<name> for the repository at \<url>.

Example:
```js
grunt.initConfig({
    gitremote: {
        mytargat: {
            options: {
                add: { name: 'upstream', url: 'remote_uri' }
            }
        }
    },
});
```
##### suboptions for add

###### options.t
Type: `String`  
Default value: undefined

###### options.f
Type: `Boolean`  
Default value: undefined

###### options.tags
Type: `Boolean`  
Default value: undefined

Set the --tags or --no-tags flag

###### options.mirror
Type: `String`  
Default value: undefined

Example:
```js
grunt.initConfig({
    gitremote: {
        mytargat: {
            options: {
                add: { name: 'upstream', url: 'remote_uri' }
                t: 'branch',
                f: true,
                tags: true, //true => --tags, false => --no-tags
                mirror: 'fetch'  //<fetch | push>
            }
        }
    },
});
```


#### options.rename
Type: `Object`  
Default value: undefined

Rename the remote named \<old> to \<new>.

Example:
```js
grunt.initConfig({
    gitremote: {
        mytargat: {
            options: {
                rename: { old: 'origin', new : 'upstream' }
            }
        }
    },
});
```

#### options.remove
Type: `String`  
Default value: undefined

Remove the remote named \<name>.

#### options.sethead
Type: `String`  
Default value: undefined

Sets or deletes the default branch (i.e. the target of the symbolic-ref refs/remotes/<name>/HEAD) for the named remote.

##### suboptions for sethead

###### options.auto
Type: `Boolean`  
Default value: undefined

###### options.delete
Type: `Boolean`  
Default value: undefined

###### options.branch
Type: `String`  
Default value: undefined

Example:
```js
grunt.initConfig({
    gitremote: {
        mytargat: {
            options: {
                sethead: 'name',
                branch: 'branch'
            }
        },
        mytargat2: {
            options: {
                sethead: 'name',
                auto: true
             }
        },
        mytargat3: {
            options: {
                sethead: 'name',
                delete: true
            }
        }
    },
});
```

#### options.setbranches
Type: `Object`  
Default value: undefined

Changes the list of branches tracked by the named remote.

Example:
```js
grunt.initConfig({
    gitremote: {
        mytargat: {
            options: {
                setbranches: { name: 'name', branch: 'branch' }
            }
        }
    },
});
```

##### suboptions for setbranches

###### options.add
Type: `Boolean`  
Default value: undefined

Instead of replacing the list of currently tracked branches, adds to that list.

Example:
```js
grunt.initConfig({
    gitremote: {
        mytargat: {
            options: {
                setbranches: { name: 'name', branch: 'branch' }
                add: true
            }
        }
    },
});
```

#### options.geturl
Type: `String`  
Default value: undefined

Retrieves the URLs for a remote.

##### suboptions for geturl

###### options.push
Type: `Boolean`  
Default value: undefined

###### options.all
Type: `Boolean`  
Default value: undefined

#### options.seturl
Type: `Object`  
Default value: undefined

Changes URLs for the remote.

Example:
```js
grunt.initConfig({
    gitremote: {
        mytargat: {
            options: {
                seturl: { name: 'name', url: 'newurl', oldurl: 'oldurl' }
            }
        }
    },
});
```

##### suboptions for seturl

###### options.push
Type: `Boolean`  
Default value: undefined

Push URLs are manipulated instead of fetch URLs.

###### options.add
Type: `Boolean`  
Default value: undefined

Instead of changing existing URLs, new URL is added.

###### options.delete
Type: `Boolean`  
Default value: undefined

Instead of changing existing URLs, all URLs matching regex <url> are deleted for remote <name>. Trying to delete all non-push URLs is an error.

Example:
```js
grunt.initConfig({
    gitremote: {
        mytargat: {
            options: {
                seturl: { name: 'name', url: 'newurl' },
                push: true
            }
        },
        mytargat2: {
            options: {
                seturl: { name: 'name', url: 'newurl' },
                add: true
            }
        },
        mytargat3: {
            options: {
                seturl: { name: 'name', url: 'newurl' },
                delete: true
            }
        }
    },
});
```

#### options.show
Type: `String`  
Default value: undefined

Gives some information about the remote \<name>.

##### suboptions for show

###### options.n
Type: `Boolean`  
Default value: undefined

The remote heads are not queried first with git ls-remote <name>; cached information is used instead.

#### options.prune
Type: `String`  
Default value: undefined

Deletes stale references associated with \<name>.

#### options.update
Type: `Array`  
Default value: undefined

Fetch updates for remotes or remote groups in the repository as defined by remotes.\<group>. 

Example:
```js
grunt.initConfig({
    gitremote: {
        mytargat: {
            options: {
                update: ['origin', 'upstream']
            }
        }
    },
});
```

##### suboptions for update

###### options.prune
Type: `Boolean`  
Default value: undefined

Run pruning against all the remotes that are updated.

#### options.callback
Type: `Function`
Default value: none

A callback function to call with the result.

### Usage Examples

```js
grunt.initConfig({
    gitremote: {
        mytarget: {
            options: {
                geturl: 'origin',
                callback: function (result) { ... },
            }
        }
    },
});
```

For full details on all the possible codes, please see the [git remote documentation](https://git-scm.com/docs/git-remote).

## contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
