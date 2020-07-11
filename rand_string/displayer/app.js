// https://gist.github.com/Ajhaa/b46efdc5510b41d7df0cb33dbcd1b5e5
const crypto = require('crypto')
const http = require('http');
const fs = require('fs')

function toHexString(byteArr) {
  return Array.from(byteArr).map(e => {
    const str = e.toString(16)
    if (str.length === 1) return "0" + str
    return str
  }).join('')
}


function uuidv4() {
  const bytes = crypto.randomBytes(16)

  // Set variant bits to 10
  bytes[8] |= 1 << 7
  bytes[8] &= ~(1 << 6)

  // Set version bits to 4 (0b0100)
  bytes[6] &= 15 // 0b00001111
  bytes[6] |= 1 << 6

  return this.str = [
    toHexString(bytes.slice(0, 4)),
    toHexString(bytes.slice(4, 6)),
    toHexString(bytes.slice(6, 8)),
    toHexString(bytes.slice(8, 10)),
    toHexString(bytes.slice(10, 16))
  ].join('-')
}

const uuid = uuidv4()

const server = http.createServer((_, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  try {
    const stamp = fs.readFileSync('/app/shared/stamp.txt')
    const pingpong = fs.readFileSync('/app/shared/pong.txt')
    res.write(stamp + ' ' + uuid + '\nPings / Pongs: ' + pingpong)
  } catch (e) {
    res.write('read failed')
  }
  res.end()
});

server.listen(3000)