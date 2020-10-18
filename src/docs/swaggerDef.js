const { version } = require('../../package.json')

const swaggerDef = {
    openapi: '3.0.0',
    info: {
        title: 'Tweet Miner API Documentation',
        description:
            'Tweet Miner is a Simple Project to Scrape Tweets Dynamically from Specific Topics using Node.js, Express, and Mongoose',
        version,
        contact: {
            name: 'The API Developer <Mahdi Rashidi>',
            email: 'm8rashidi@gmail.com',
        },
        license: {
            name: 'MIT',
            url: 'https://github.com/MRdevX/tweet-miner-api',
        },
    },
    servers: [
        {
            url: `https://tweet-miner-app.herokuapp.com/v1`,
        },
        {
            url: `http://localhost:${process.env.PORT}/v1`,
        },
    ],
}

module.exports = swaggerDef
