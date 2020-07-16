const app = require('express')()
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

app.get('/', (_, res) => {
  res.json({ message: 'welcome' })
})

app.get('/pingpong', async (_, res) => {
  const queryResult = await pool.query('SELECT count FROM pings WHERE id = 0 LIMIT 1')
  if (queryResult.rowCount === 0) {
    await pool.query('INSERT INTO pings (id, count) VALUES (0, 0)')
  }
  const count = queryResult.rowCount === 0 ? 0 : queryResult.rows[0].count

  await pool.query('UPDATE pings SET count = count + 1 WHERE id = 0')

  res.send('pong ' + count)
})

app.get('/pingpong/api', async (_ ,res) => {
  const queryResult = await pool.query('SELECT count FROM pings WHERE id = 0 LIMIT 1')
  if (queryResult.rowCount === 0) {
    await pool.query('INSERT INTO pings (id, count) VALUES (0, 0)')
  }
  const count = queryResult.rowCount === 0 ? 0 : queryResult.rows[0].count

  res.json({ pings: count })
})


app.listen(3000, () => {
  console.log('listening in 3000')
})