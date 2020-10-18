const faker = require('faker')
const { Topic } = require('../../../src/models')

describe('Topic model', () => {
    describe('Topic validation', () => {
        let newTopic
        beforeEach(() => {
            newTopic = {
                title: faker.lorem.word(),
            }
        })

        test('should correctly validate a valid topic', async () => {
            await expect(new Topic(newTopic).validate()).resolves.toBeUndefined()
        })
    })
})
