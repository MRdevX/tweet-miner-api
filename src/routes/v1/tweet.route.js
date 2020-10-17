const express = require('express')
const auth = require('../../middlewares/auth')
const validate = require('../../middlewares/validate')
const tweetValidation = require('../../validations/tweet.validation')
const tweetController = require('../../controllers/tweet.controller')

const router = express.Router()

router
    .route('/')
    .post(auth('manageTweets'), validate(tweetValidation.createTweet), tweetController.createTweet)
    .get(auth('getTweets'), validate(tweetValidation.getTweets), tweetController.getTweets)

router
    .route('/:tweetId')
    .get(auth('getTweets'), validate(tweetValidation.getTweet), tweetController.getTweet)
    .patch(auth('manageTweets'), validate(tweetValidation.updateTweet), tweetController.updateTweet)
    .delete(
        auth('manageTweets'),
        validate(tweetValidation.deleteTweet),
        tweetController.deleteTweet,
    )

module.exports = router
