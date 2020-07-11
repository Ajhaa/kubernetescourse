const http = require('http')
const fs = require('fs')

let count = 0
const server = http.createServer((_, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.write('pong ' + count)
  res.end()
  count++
  fs.writeFileSync('/app/shared/pong.txt', ''+count)
});

server.listen(3000)