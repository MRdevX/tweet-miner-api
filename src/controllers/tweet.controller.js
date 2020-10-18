const httpStatus = require('http-status')
const pick = require('../utils/pick')
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const { tweetService } = require('../services')

const createTweet = catchAsync(async (req, res) => {
    const tweet = await tweetService.createTweet(req.body)
    res.status(httpStatus.CREATED).send(tweet)
})

const getTweets = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['tweet_id', 'text', 'topic', 'created_at'])
    const options = pick(req.query, ['sortBy', 'limit', 'page'])
    const result = await tweetService.queryTweets(filter, options)
    res.send(result)
})

const getTweet = catchAsync(async (req, res) => {
    const tweet = await tweetService.getTweetById(req.params.tweetId)
    if (!tweet) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Tweet not found')
    }
    res.send(tweet)
})

const updateTweet = catchAsync(async (req, res) => {
    const tweet = await tweetService.updateTweetById(req.params.tweetId, req.body)
    res.send(tweet)
})

const deleteTweet = catchAsync(async (req, res) => {
    await tweetService.deleteTweetById(req.params.tweetId)
    res.status(httpStatus.NO_CONTENT).send()
})

module.exports = {
    createTweet,
    getTweets,
    getTweet,
    updateTweet,
    deleteTweet,
}
