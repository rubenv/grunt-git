'use strict';

var grunt = require('grunt');
var ArgUtil = require('flopmang');

var status_types = {
    ' M': 'modified',
    '??': 'untracked',
};

var status_states = [
    [ /[!]/,     /[!]/,   'ignored',                      ],
    [ /[\?]/,    /[\?]/,  'untracked'                     ],
    [ /[]/,      /[MD]/,  'not updated'                   ],
    [ /[M]/,     /[ MD]/, 'updated in index'              ],
    [ /[A]/,     /[ MD]/, 'added to index'                ],
    [ /[D]/,     /[ D]/,  'deleted from index'            ],
    [ /[R]/,     /[ MD]/, 'renamed in index'              ],
    [ /[C]/,     /[ MD]/, 'copied in index'               ],
    [ /[MARC]/,  /[ ]/,   'index and work tree matches'   ],
    [ /[ MARC]/, /[M]/,   'work tree changed since index' ],
    [ /[ MARC]/, /[D]/,   'deleted in work tree'          ],
    [ /[D]/,     /[D]/,   'unmerged, both deleted'        ],
    [ /[A]/,     /[U]/,   'unmerged, added by us'         ],
    [ /[U]/,     /[D]/,   'unmerged, deleted by them'     ],
    [ /[U]/,     /[A]/,   'unmerged, added by them'       ],
    [ /[D]/,     /[U]/,   'unmerged, deleted by us'       ],
    [ /[A]/,     /[A]/,   'unmerged, both added'          ],
    [ /[U]/,     /[U]/,   'unmerged, both modified'       ],
    [ /./,       /./,     'N/A'                           ],
];

function parseStatus(str) {
    return str.split(/[\r\n]+/).reduce(function (acc, line) {
        var match = /^(.)(.) (.*?)(?: -> (.*)|)$/.exec(line);
        if (match) {
            var x        = match[1];
            var y        = match[2];
            var xy       = x + y;
            var file     = match[3];
            var alt_file = match[4];
            for (var i = 0; i < status_states.length; i++) {
                var state = status_states[i];
                if (state[0].exec(x) && state[1].exec(y)) {
                    var diagnosis = {
                        code:  xy,
                        file:  file,
                        descr: state[2]
                    };
                    if (typeof alt_file !== 'undefined') {
                        diagnosis.alt_file = alt_file;
                    }
                    acc.push(diagnosis);
                    return acc;
                }
            }
            grunt.fail.warn('Status could not diagnose: ' + line);
        } else if (line !== '') {
            grunt.fail.warn('Status could not parse: ' + line);
        }
        return acc;
    }, []);
}

module.exports = function (task, exec, done) {
    var options = task.options({
        prop: 'gitstatus.' + task.target + '.result'
    });

    var argConfigs = [
        {
            option:       'porcelain',
            useAsFlag:    true,
            useValue:     false,
            defaultValue: true,
        },
        {
            option:       'includeIgnored',
            useAsFlag:    true,
            flag:         '--ignored',
            useValue:     false,
            defaultValue: false,
        },
    ];

    var argUtil = new ArgUtil(task, argConfigs);

    function handleResult(err, result) {
        if (err) {
            grunt.fail.fatal('Error running git status');
            return;
        }

        var status = parseStatus(result.stdout);

        if (options.prop) {
            grunt.config.set(options.prop, status);
        }

        if (typeof options.callback === 'function') {
            options.callback(status);
        }

        done();
    }

    var args = ['status'].concat(argUtil.getArgFlags());
    args.push(handleResult);
    exec.apply(null, args);
};

module.exports.description = 'Read status from a git repository.';
