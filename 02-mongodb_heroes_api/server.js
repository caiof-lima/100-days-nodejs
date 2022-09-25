const http = require('http')
const url = require('url')
const controller = require('./src/controllers/heroController')
const PORT = process.env.PORT || 4000

const server = http.createServer(async (req, res) => {
    
    res.setHeader('Content-Type', 'application/json');

    const { pathname, query } = url.parse(req.url);

    if (pathname === '/heroes') {

        if (req.method === 'GET') {
            // logic here
        }

        if (req.method === 'POST') {
            let data = '';
            req.on('data', chunk => data += chunk)

            req.on('end', async () => {
                const body = JSON.parse(data)
                const response = await controller.save(body);

                res.end(JSON.stringify(response))
            })
        }

    } else {
        res.writeHead(404)
        res.end(JSON.stringify({
            message: "The route that you're trying to access does not exist"
        }))
    }
})

server.listen(PORT, () => {
    console.log(`Server running on fire at port ${PORT} 🔥`)
})