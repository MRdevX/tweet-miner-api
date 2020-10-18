const express = require('express')
const helmet = require('helmet')
const xss = require('xss-clean')
const cron = require('node-cron')
const mongoSanitize = require('express-mongo-sanitize')
const compression = require('compression')
const cors = require('cors')
const passport = require('passport')
const httpStatus = require('http-status')
const config = require('./config/config')
const morgan = require('./config/morgan')
const { jwtStrategy } = require('./config/passport')
const { authLimiter } = require('./middlewares/rateLimiter')
const routes = require('./routes/v1')
const { errorConverter, errorHandler } = require('./middlewares/error')
const { topicService, tweetService } = require('./services')
const ApiError = require('./utils/ApiError')

const app = express()

if (config.env !== 'test') {
    app.use(morgan.successHandler)
    app.use(morgan.errorHandler)

    cron.schedule('*/15 * * * * *', async () => {
        const latestDate = await tweetService.getLatestTweetDate()
        const query = await topicService.buildTopicsQuery()
        await tweetService.fetchRecentTweets(query, 100, latestDate)
    })

    let day = -6
    const weekTask = cron.schedule(
        '*/25 * * * * *',
        async () => {
            const { start_time, end_time } = tweetService.getStartAndEndTimePeriod(day)
            const query = await topicService.buildTopicsQuery()
            tweetService.fetchLastWeekTweets(query, 100, start_time, end_time)
            day += 1
            if (day === 0) {
                weekTask.stop()
                weekTask.destroy()
            }
        },
        { scheduled: false },
    )
    weekTask.start()
}

// set security HTTP headers
app.use(helmet())

// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// sanitize request data
app.use(xss())
app.use(mongoSanitize())

// gzip compression
app.use(compression())

// enable cors
app.use(cors())
app.options('*', cors())

// jwt authentication
app.use(passport.initialize())
passport.use('jwt', jwtStrategy)

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
    app.use('/v1/auth', authLimiter)
}

// v1 api routes
app.use('/v1', routes)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

// convert error to ApiError, if needed
app.use(errorConverter)

// handle error
app.use(errorHandler)

module.exports = app
