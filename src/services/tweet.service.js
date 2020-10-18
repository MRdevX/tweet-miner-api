const httpStatus = require('http-status')
const axios = require('axios')
const moment = require('moment') // require
const config = require('../config/config')
const { Tweet } = require('../models')
const ApiError = require('../utils/ApiError')

/**
 * Create a tweet
 * @param {Object} tweetBody
 * @returns {Promise<Tweet>}
 */
const createTweet = async (tweetBody) => {
    const tweet = await Tweet.create(tweetBody)
    return tweet
}

/**
 * Query for tweets
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTweets = async (filter, options) => {
    const tweets = await Tweet.paginate(filter, options)
    return tweets
}

/**
 * Get tweet by id
 * @param {ObjectId} id
 * @returns {Promise<Tweet>}
 */
const getTweetById = async (id) => {
    return Tweet.findById(id)
}

/**
 * Get Latest Tweet Date Stored in Database
 * @returns {string}
 */
const getLatestTweetDate = async () => {
    let latestTweetDate = moment().utc().day(-1).toISOString()
    const latestTweet = await Tweet.findOne().sort({ created_at: -1 }).select('created_at -_id')
    if (latestTweet) {
        latestTweetDate = latestTweet.created_at
    }

    return latestTweetDate
}

/**
 * Get Latest Tweet Date Stored in Database
 * @returns {string}
 */
const getStartAndEndTimePeriod = (day) => {
    const start_time = moment()
        .utc()
        .day(day - 1)
        .toISOString()
    const end_time = moment().utc().day(day).toISOString()

    return { start_time, end_time }
}

/**
 * find tweet by query
 * @param {Object} query
 * @returns {Promise<Tweet>}
 */
const findTweet = async (query) => {
    return Tweet.findOne(query)
}

/**
 * store all tweets asyncronously in mongodb
 * @param {Object} tweets
 */
const saveFetchedTweets = async (tweets) => {
    await Promise.all(
        tweets.map(async (tweet) => {
            const { id, created_at, text } = tweet
            const duplicate = await Tweet.findOne({ tweet_id: id })
            if (!duplicate) {
                await createTweet({ created_at, text, tweet_id: id })
            }
        }),
    )
}

/**
 * Call Twitter API and Fetched Desired Tweets
 * @param {string} query - query to find tweets
 * @param {number} limit - maximum results from twitter api
 * @param {number} start_time - start from date
 * @returns {Promise<QueryResult>}
 */
const fetchLastWeekTweets = async (query, limit, start_time, end_time, next_token) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'https://api.twitter.com/2/tweets/search/recent',
            headers: {
                Authorization: `Bearer ${config.twitter.bearer_token}`,
            },
            params: {
                'tweet.fields': 'created_at',
                max_results: limit,
                query,
                start_time,
                end_time,
                next_token,
            },
        })
        const { data, meta } = response.data
        if (meta.result_count >= limit) {
            const nest_token = meta.next_token
            await fetchLastWeekTweets(query, limit, start_time, end_time, nest_token)
        }
        await saveFetchedTweets(data)
    } catch (err) {
        throw new ApiError(httpStatus.SERVICE_UNAVAILABLE, 'Service Unavailable')
    }
}

/**
 * Call Twitter API and Fetched Desired Tweets
 * @param {string} query - query to find tweets
 * @param {number} limit - maximum results from twitter api
 * @param {number} start_time - start from date
 * @returns {Promise<QueryResult>}
 */
const fetchRecentTweets = async (query, limit, start_time) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'https://api.twitter.com/2/tweets/search/recent',
            headers: {
                Authorization: `Bearer ${config.twitter.bearer_token}`,
            },
            params: {
                'tweet.fields': 'created_at',
                max_results: limit,
                query,
                start_time,
            },
        })
        const tweets = response.data.data
        await saveFetchedTweets(tweets)
    } catch (err) {
        throw new ApiError(httpStatus.SERVICE_UNAVAILABLE, 'Service Unavailable')
    }
}

/**
 * Update tweet by id
 * @param {ObjectId} tweetId
 * @param {Object} updateBody
 * @returns {Promise<Tweet>}
 */
const updateTweetById = async (tweetId, updateBody) => {
    const tweet = await getTweetById(tweetId)
    if (!tweet) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Tweet not found')
    }
    Object.assign(tweet, updateBody)
    await tweet.save()
    return tweet
}

/**
 * Delete tweet by id
 * @param {ObjectId} tweetId
 * @returns {Promise<Tweet>}
 */
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
    findTweet,
    getTweetById,
    saveFetchedTweets,
    getLatestTweetDate,
    fetchLastWeekTweets,
    fetchRecentTweets,
    getStartAndEndTimePeriod,
    updateTweetById,
    deleteTweetById,
}
