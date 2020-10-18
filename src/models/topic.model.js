const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')

const topicSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
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
