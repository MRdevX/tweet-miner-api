const httpStatus = require('http-status')
const { Topic } = require('../models')
const ApiError = require('../utils/ApiError')

/**
 * Create a topic
 * @param {Object} topicBody
 * @returns {Promise<Topic>}
 */
const createTopic = async (topicBody) => {
    const topic = await Topic.create(topicBody)
    return topic
}

/**
 * Build a Topic Query suitable for Twitter API
 * @returns {string}
 */
const buildTopicsQuery = async () => {
    const topics = await Topic.find({}).select('title -_id').exec()
    const query = topics.map((t) => t.title).join('"OR"')
    return `"${query}"`
}

/**
 * Query for topics
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTopics = async (filter, options) => {
    const topics = await Topic.paginate(filter, options)
    return topics
}

/**
 * Get topic by id
 * @param {ObjectId} id
 * @returns {Promise<Topic>}
 */
const getTopicById = async (id) => {
    return Topic.findById(id)
}

/**
 * find topic by query
 * @param {Object} query
 * @returns {Promise<Topic>}
 */
const findTopic = async (query) => {
    return Topic.findOne(query)
}

/**
 * Update topic by id
 * @param {ObjectId} topicId
 * @param {Object} updateBody
 * @returns {Promise<Topic>}
 */
const updateTopicById = async (topicId, updateBody) => {
    const topic = await getTopicById(topicId)
    if (!topic) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Topic not found')
    }
    Object.assign(topic, updateBody)
    await topic.save()
    return topic
}

/**
 * Delete topic by id
 * @param {ObjectId} topicId
 * @returns {Promise<Topic>}
 */
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
