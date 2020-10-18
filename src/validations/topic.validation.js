const Joi = require('joi')
const { objectId } = require('./custom.validation')

const createTopic = {
    body: Joi.object().keys({
        title: Joi.string().required(),
    }),
}

const getTopics = {
    query: Joi.object().keys({
        title: Joi.string(),

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
            title: Joi.string(),
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
