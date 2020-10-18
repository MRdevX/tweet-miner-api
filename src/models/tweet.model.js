const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')

const tweetSchema = mongoose.Schema(
    {
        tweet_id: {
            type: String,
            required: true,
            trim: true,
        },
        text: {
            type: String,
            trim: true,
        },
        created_at: {
            type: Date,
        },
    },
    {
        timestamps: true,
    },
)

// add plugin that converts mongoose to json
tweetSchema.plugin(toJSON)
tweetSchema.plugin(paginate)

/**
 * @typedef Tweet
 */
const Tweet = mongoose.model('Tweet', tweetSchema)

module.exports = Tweet
