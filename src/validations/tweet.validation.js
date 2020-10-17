const Joi = require('joi')
const { password, objectId } = require('./custom.validation')

const createTweet = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
        name: Joi.string().required(),
        role: Joi.string().required().valid('tweet', 'admin'),
    }),
}

const getTweets = {
    query: Joi.object().keys({
        name: Joi.string(),
        role: Joi.string(),
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
            email: Joi.string().email(),
            password: Joi.string().custom(password),
            name: Joi.string(),
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
