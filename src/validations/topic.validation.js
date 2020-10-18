const Joi = require('joi')
const { password, objectId } = require('./custom.validation')

const createTopic = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
        name: Joi.string().required(),
        role: Joi.string().required().valid('topic', 'admin'),
    }),
}

const getTopics = {
    query: Joi.object().keys({
        name: Joi.string(),
        role: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
}

const getTopic = {
    params: Joi.object().keys({
        topicId: Joi.string().custom(objectId),
    }),
}

const updateTopic = {
    params: Joi.object().keys({
        topicId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            email: Joi.string().email(),
            password: Joi.string().custom(password),
            name: Joi.string(),
        })
        .min(1),
}

const deleteTopic = {
    params: Joi.object().keys({
        topicId: Joi.string().custom(objectId),
    }),
}

module.exports = {
    createTopic,
    getTopics,
    getTopic,
    updateTopic,
    deleteTopic,
}
