const express = require('express')
const auth = require('../../middlewares/auth')
const validate = require('../../middlewares/validate')
const topicValidation = require('../../validations/topic.validation')
const topicController = require('../../controllers/topic.controller')

const router = express.Router()

router
    .route('/')
    .post(auth('manageTopics'), validate(topicValidation.createTopic), topicController.createTopic)
    .get(auth('getTopics'), validate(topicValidation.getTopics), topicController.getTopics)

router
    .route('/:topicId')
    .get(auth('getTopics'), validate(topicValidation.getTopic), topicController.getTopic)
    .patch(auth('manageTopics'), validate(topicValidation.updateTopic), topicController.updateTopic)
    .delete(
        auth('manageTopics'),
        validate(topicValidation.deleteTopic),
        topicController.deleteTopic,
    )

module.exports = router
