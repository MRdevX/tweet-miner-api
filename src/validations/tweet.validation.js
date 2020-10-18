const Joi = require('joi')
const { objectId } = require('./custom.validation')

const createTweet = {
    body: Joi.object().keys({
        tweet_id: Joi.string().required(),
        text: Joi.string().required(),
        topic: Joi.string().custom(objectId),
        created_at: Joi.date(),
    }),
}

const getTweets = {
    query: Joi.object().keys({
        tweet_id: Joi.string(),
        text: Joi.string(),
        topic: Joi.string().custom(objectId),
        created_at: Joi.date(),

        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
}

const getTweet = {
    params: Joi.object().keys({
        tweetId: Joi.string().custom(objectId),
    }),
}

const updateTweet = {
    params: Joi.object().keys({
        tweetId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            tweet_id: Joi.string(),
            text: Joi.string(),
            topic: Joi.string().custom(objectId),
            created_at: Joi.date(),
        })
        .min(1),
}

const deleteTweet = {
    params: Joi.object().keys({
        tweetId: Joi.string().custom(objectId),
    }),
}

module.exports = {
    createTweet,
    getTweets,
    getTweet,
    updateTweet,
    deleteTweet,
}
