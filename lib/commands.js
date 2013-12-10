module.exports = {
    checkout:   require('./command_checkout'),
    clone:      require('./command_clone'),
    commit:     require('./command_commit'),
    push:       require('./command_push'),
    rebase:     require('./command_rebase'),
    reset:      require('./command_reset'),
    stash:      require('./command_stash'),
    tag:        require('./command_tag'),
    merge:      require('./command_merge')
};
