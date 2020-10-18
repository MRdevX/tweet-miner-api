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

/**
 * @swagger
 * tags:
 *   name: Tweets
 *   description: Tweet management and retrieval
 */

/**
 * @swagger
 * path:
 *  /tweets:
 *    post:
 *      summary: Create a tweet
 *      description: Only admins can create other tweets.
 *      tags: [Tweets]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - tweet_id
 *                - text
 *                - created_at
 *              properties:
 *                tweet_id:
 *                  type: string
 *                text:
 *                  type: string
 *                created_at:
 *                  type: string
 *              example:
 *                tweet_id: "1317754157462392833"
 *                text: "RT @eAthleten: Lieber voreingenommener Herr Christian Pfeiffer, auch wenn Sie kein Interesse an aktuellen Informationen haben."
 *                created_at: "2020-10-18T09:07:28.000Z"
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Tweet'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 *    get:
 *      summary: Get all tweets
 *      description: Only admins can retrieve all tweets.
 *      tags: [Tweets]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: tweet_id
 *          schema:
 *            type: string
 *          description: Tweet id
 *        - in: query
 *          name: text
 *          schema:
 *            type: string
 *          description: Tweet text
 *        - in: query
 *          name: sortBy
 *          schema:
 *            type: string
 *          description: sort by query in the form of field:desc/asc (ex. name:asc)
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            minimum: 1
 *          default: 10
 *          description: Maximum number of tweets
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *            minimum: 1
 *            default: 1
 *          description: Page number
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  results:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Tweet'
 *                  page:
 *                    type: integer
 *                    example: 1
 *                  limit:
 *                    type: integer
 *                    example: 10
 *                  totalPages:
 *                    type: integer
 *                    example: 1
 *                  totalResults:
 *                    type: integer
 *                    example: 1
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * path:
 *  /tweets/{id}:
 *    get:
 *      summary: Get a tweet
 *      description: Logged in tweets can fetch only their own tweet information. Only admins can fetch other tweets.
 *      tags: [Tweets]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Tweet id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Tweet'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    patch:
 *      summary: Update a tweet
 *      description: Logged in tweets can only update their own information. Only admins can update other tweets.
 *      tags: [Tweets]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Tweet id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                tweet_id:
 *                  type: string
 *                text:
 *                  type: string
 *                created_at:
 *                  type: string
 *              example:
 *                tweet_id: "1317754157462392833"
 *                text: "RT @eAthleten: Lieber voreingenommener Herr Christian Pfeiffer, auch wenn Sie kein Interesse an aktuellen Informationen haben."
 *                created_at: "2020-10-18T09:07:28.000Z"
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Tweet'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    delete:
 *      summary: Delete a tweet
 *      description: Logged in tweets can delete only themselves. Only admins can delete other tweets.
 *      tags: [Tweets]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Tweet id
 *      responses:
 *        "200":
 *          description: No content
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */
