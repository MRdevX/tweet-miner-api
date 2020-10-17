const httpStatus = require('http-status')
const axios = require('axios')
const { Tweet } = require('../models')
const ApiError = require('../utils/ApiError')

const createTweet = async (tweetBody) => {
    const tweet = await Tweet.create(tweetBody)
    return tweet
}

const queryTweets = async (filter, options) => {
    const tweets = await Tweet.paginate(filter, options)
    return tweets
}

const getTweetById = async (id) => {
    return Tweet.findById(id)
}

// const fetchRecentTweets = async (startTime, endTime, query) => {
//     try {
//         const response = await axios.get(
//             `https://api.twitter.com/2/tweets/search/recent?from=${startDate}&to=${endDate}`,
//         )
//         const programs = response.data.details.list
//         await Promise.all(
//             programs.map(async (program) => {
//                 await createProgram(program)
//             }),
//         )
//         return programs.length
//     } catch (err) {
//         throw new ApiError(httpStatus.SERVICE_UNAVAILABLE, 'Service Unavailable')
//     }
// }

const updateTweetById = async (tweetId, updateBody) => {
    const tweet = await getTweetById(tweetId)
    if (!tweet) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Tweet not found')
    }
    Object.assign(tweet, updateBody)
    await tweet.save()
    return tweet
}

const deleteTweetById = async (tweetId) => {
    const tweet = await getTweetById(tweetId)
    if (!tweet) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Tweet not found')
    }
    await tweet.remove()
    return tweet
}

module.exports = {
    createTweet,
    queryTweets,
    getTweetById,
    fetchRecentTweets,
    updateTweetById,
    deleteTweetById,
}
