const roles = ['user', 'admin']

const roleRights = new Map()
roleRights.set(roles[0], ['manageTweets', 'getTweets', 'getTopics', 'manageTopics'])
roleRights.set(roles[1], [
    'getUsers',
    'manageUsers',
    'manageTweets',
    'getTweets',
    'getTopics',
    'manageTopics',
])

module.exports = {
    roles,
    roleRights,
}
