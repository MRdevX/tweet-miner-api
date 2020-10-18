const mongoose = require('mongoose')
const faker = require('faker')
const Tweet = require('../../src/models/tweet.model')

const tweetOne = {
    _id: mongoose.Types.ObjectId(),
    tweet_id: faker.random.number(),
    text: faker.lorem.lines(),
    created_at: faker.date.recent(),
}

const tweetTwo = {
    _id: mongoose.Types.ObjectId(),
    tweet_id: faker.random.number(),
    text: faker.lorem.lines(),
    created_at: faker.date.past(),
}

const insertTweets = async (tweets) => {
    await Tweet.insertMany(tweets.map((tweet) => ({ ...tweet })))
}

module.exports = {
    tweetOne,
    tweetTwo,
    insertTweets,
}
