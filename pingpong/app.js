const http = require('http')
const fs = require('fs')

let count = 0
const server = http.createServer((req, res) => {
  if (req.url === '/pingpong') {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.write('pong ' + count)
    res.end()
    count++
    return
  } else if (req.url === '/pingpong/api') {
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify({ pings: count }))
    res.end()
    return
  }
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.statusCode = 404
  res.write('404 not found')
  res.end()
});

server.listen(3000)