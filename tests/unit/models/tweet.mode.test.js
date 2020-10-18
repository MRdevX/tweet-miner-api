const faker = require('faker')
const { Tweet } = require('../../../src/models')

describe('Tweet model', () => {
    describe('Tweet validation', () => {
        let newTweet
        beforeEach(() => {
            newTweet = {
                tweet_id: faker.random.uuid(),
                text: faker.lorem.lines(),
                created_at: faker.date.recent(),
            }
        })

        test('should correctly validate a valid tweet', async () => {
            await expect(new Tweet(newTweet).validate()).resolves.toBeUndefined()
        })
    })
})
