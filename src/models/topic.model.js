const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')

const topicSchema = mongoose.Schema(
    {
        topic_id: {
            type: String,
            required: true,
            trim: true,
        },
        text: {
            type: String,
            trim: true,
        },
        topic: {
            type: String,
            trim: true,
        },
        created_at: {
            type: Date,
        },
    },
    {
        timestamps: true,
    },
)

// add plugin that converts mongoose to json
topicSchema.plugin(toJSON)
topicSchema.plugin(paginate)

/**
 * @typedef Topic
 */
const Topic = mongoose.model('Topic', topicSchema)

module.exports = Topic
