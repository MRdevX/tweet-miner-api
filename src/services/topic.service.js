const httpStatus = require('http-status')
const { Topic } = require('../models')
const ApiError = require('../utils/ApiError')

const createTopic = async (topicBody) => {
    const topic = await Topic.create(topicBody)
    return topic
}

const buildTopicsQuery = async () => {
    const topics = await Topic.find({}).select('title -_id').exec()
    const query = topics.map((t) => t.title).join('"OR"')
    return `"${query}"`
}

const queryTopics = async (filter, options) => {
    const topics = await Topic.paginate(filter, options)
    return topics
}

const getTopicById = async (id) => {
    return Topic.findById(id)
}

const findTopic = async (query) => {
    return Topic.findOne(query)
}

const updateTopicById = async (topicId, updateBody) => {
    const topic = await getTopicById(topicId)
    if (!topic) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Topic not found')
    }
    Object.assign(topic, updateBody)
    await topic.save()
    return topic
}

const deleteTopicById = async (topicId) => {
    const topic = await getTopicById(topicId)
    if (!topic) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Topic not found')
    }
    await topic.remove()
    return topic
}

module.exports = {
    createTopic,
    queryTopics,
    findTopic,
    getTopicById,
    buildTopicsQuery,
    updateTopicById,
    deleteTopicById,
}
