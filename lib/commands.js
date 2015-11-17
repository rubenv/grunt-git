module.exports = {
    add: require('./command_add'),
    archive: require('./command_archive'),
    checkout: require('./command_checkout'),
    clean: require('./command_clean'),
    clone: require('./command_clone'),
    commit: require('./command_commit'),
    fetch: require('./command_fetch'),
    log: require('./command_log'),
    merge: require('./command_merge'),
    pull: require('./command_pull'),
    push: require('./command_push'),
    rebase: require('./command_rebase'),
    reset: require('./command_reset'),
    rm: require('./command_rm'),
    stash: require('./command_stash'),
    tag: require('./command_tag'),
    diff: require('./command_diff')
};
