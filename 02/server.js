const http = require('http')
const url = require('url')

const PORT = process.env.PORT || 4000

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");

    const { pathname, query } = url.parse(req.url);

    if(pathname === '/heroes') {
        res.end(JSON.stringify({
            pathname: pathname,
            query: query
        }))

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