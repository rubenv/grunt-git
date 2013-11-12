module.exports = {
    checkout:   require('./command_checkout'),
    clone:      require('./command_clone'),
    commit:     require('./command_commit'),
    stash:      require('./command_stash'),
    tag:        require('./command_tag')
};
