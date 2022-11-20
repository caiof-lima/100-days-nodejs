const http = require('http')
const url = require('url')
const mongoose = require('mongoose')
const controller = require('./src/controllers/heroController')

try {
    var env = require('./environment')
} catch (error) {
    throw new Error('No environment file has found, to start server is necessary to create one')
}

mongoose.connect(`mongodb://${env.username}:${env.password}@${env.host}:${env.port}/${env.database}`, {
    serverSelectionTimeoutMS: 500,
})
    .then(() => {
        const PORT = process.env.PORT || 4000
        const server = http.createServer(async (req, res) => {
            res.setHeader('Content-Type', 'application/json')
            const { pathname, query } = url.parse(req.url)

            if (pathname == '/heroes') {
                if (req.method == 'GET') {
                    // logic here

                } else if (req.method == 'POST') {
                    let data = ''
                    req.on('data', chunk => data += chunk)
                    req.on('end', async () => {
                        const body = JSON.parse(data)
                        const response = await controller.save(body)

                        res.writeHead(201).end(JSON.stringify(response))
                    })
                }

            } else {
                res.writeHead(404).end(JSON.stringify({
                    message: "The route that you're trying to access does not exist"
                }))
            }
        })

        server.listen(PORT, () => {
            console.log(`Server running on fire at port ${PORT} 🔥`)
        })
    })
    .catch(error => console.error('Failed to connect to MongoDB, reason:', error.message))