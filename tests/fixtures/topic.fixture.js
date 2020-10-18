const mongoose = require('mongoose')
const faker = require('faker')
const Topic = require('../../src/models/topic.model')

const topicOne = {
    _id: mongoose.Types.ObjectId(),
    title: faker.lorem.word(),
}

const topicTwo = {
    _id: mongoose.Types.ObjectId(),
    title: faker.lorem.word(),
}

const insertTopics = async (topics) => {
    await Topic.insertMany(topics.map((topic) => ({ ...topic })))
}

module.exports = {
    topicOne,
    topicTwo,
    insertTopics,
}
