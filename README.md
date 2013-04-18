# grunt-git

> Git commands for grunt.

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

## The "git" task

### Overview
In your project's Gruntfile, add a section named `git` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  git: {
      commit: {
          options: {
              command: 'commit',
              message: 'grunt testing'
          }
          ,files: {
              //src: ['test.txt']
              src: grunt.file.expand({cwd: cwd},['**/*'])
          }
      },
      push: {
          options: {
              command: 'push'
          }
      }
  },
})
```

Each target defines a specific git task that can be run. The different available tasks are listed below.

### Options

Each git task accepts a different set of options. All targets require that you specify the `command` option.

#### options.command
Type: `String`
Default value: `'commit'`

The git command you wish to execute.

Available commands are:

* `commit`

### Usage Examples

#### The `commit` command
This command commits the current working tree to git.

Commit options:

* `message`: Commit message
* `files`: Files to commit

```js
grunt.initConfig({
    git: {
        task: {
            options: {
                command: 'commit',
                message: 'Testing'
            },
            files: {
                src: ['test.txt']
            }
        }
    },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 2013-03-07   v0.0.1   Initial version, which commits files. No API stability or anything promised yet.
