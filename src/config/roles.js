const roles = ['user', 'admin']

const roleRights = new Map()
roleRights.set(roles[0], ['getUsers', 'manageTweets', 'getTweets'])
roleRights.set(roles[1], ['getUsers', 'manageUsers', 'manageTweets', 'getTweets'])

module.exports = {
    roles,
    roleRights,
}
