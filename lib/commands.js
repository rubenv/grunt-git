module.exports = {
    checkout:   require('./command_checkout'),
    clone:      require('./command_clone'),
    commit:     require('./command_commit'),
    rebase:     require('./command_rebase'),
    reset:      require('./command_reset'),
    stash:      require('./command_stash'),
    tag:        require('./command_tag')
};
