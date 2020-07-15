const http = require('http')
const { Pool } = require('pg')

let pool = null

async function connect() {
  try {
    pool = new Pool()
    await pool.query('CREATE TABLE IF NOT EXISTS pings (id integer PRIMARY KEY, count integer NOT NULL)')
  } catch(e) {
    console.log('Connection error, retrying\n', e)
    setTimeout(connect, 5000)
  }
  
}

connect()

const server = http.createServer(async (req, res) => {
  const queryResult = await pool.query('SELECT count FROM pings WHERE id = 0 LIMIT 1')
  if (queryResult.rowCount === 0) {
    await pool.query('INSERT INTO pings (id, count) VALUES (0, 0)')
  }
  const count = queryResult.rowCount === 0 ? 0 : queryResult.rows[0].count
  if (req.url === '/pingpong') {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.write('pong ' + count)
    await pool.query('UPDATE pings SET count = count + 1 WHERE id = 0')
    res.end()
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