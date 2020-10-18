const express = require('express')
const authRoute = require('./auth.route')
const userRoute = require('./user.route')
const docsRoute = require('./docs.route')
const tweetRoute = require('./tweet.route')
const topicRoute = require('./topic.route')

const router = express.Router()

router.use('/auth', authRoute)
router.use('/users', userRoute)
router.use('/docs', docsRoute)
router.use('/tweets', tweetRoute)
router.use('/topics', topicRoute)

module.exports = router
