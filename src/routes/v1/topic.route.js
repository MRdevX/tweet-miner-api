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

/**
 * @swagger
 * tags:
 *   name: Topics
 *   description: Topic management and retrieval
 */

/**
 * @swagger
 * path:
 *  /topics:
 *    post:
 *      summary: Create a topic
 *      description: Only admins can create other topics.
 *      tags: [Topics]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - title
 *              properties:
 *                title:
 *                  type: string
 *              example:
 *                title: Led Zeppelin
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Topic'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 *    get:
 *      summary: Get all topics
 *      description: Only admins can retrieve all topics.
 *      tags: [Topics]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: title
 *          schema:
 *            type: string
 *          description: Topic title
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
 *          description: Maximum number of topics
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
 *                      $ref: '#/components/schemas/Topic'
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
 *  /topics/{id}:
 *    get:
 *      summary: Get a topic
 *      description: Logged in topics can fetch only their own topic information. Only admins can fetch other topics.
 *      tags: [Topics]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Topic id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Topic'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    patch:
 *      summary: Update a topic
 *      description: Logged in topics can only update their own information. Only admins can update other topics.
 *      tags: [Topics]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Topic id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *              example:
 *                title: Lady Gaga
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Topic'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    delete:
 *      summary: Delete a topic
 *      description: Logged in topics can delete only themselves. Only admins can delete other topics.
 *      tags: [Topics]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Topic id
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
