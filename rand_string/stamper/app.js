// https://gist.github.com/Ajhaa/b46efdc5510b41d7df0cb33dbcd1b5e5
const fs = require('fs')

setInterval(() => {
  const stamp = new Date().toISOString()
  fs.writeFileSync('/app/shared/stamp.txt', stamp)
}, 5000)
