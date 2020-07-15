const todoRouter = require('express').Router()
const { Pool } = require('pg')

let pool = null

async function connect() {
  try {
    pool = new Pool()
    await pool.query(
      'CREATE TABLE IF NOT EXISTS todos (id serial PRIMARY KEY, content text NOT NULL, done boolean NOT NULL)'
    )
  } catch(e) {
    console.log('Connection error, retrying\n', e)
    setTimeout(connect, 5000)
  }
  
}

connect()

todoRouter.get('/', async (_, res) => {
  const dbRes = await pool.query('SELECT * FROM todos')

  res.json(dbRes.rows)
})

todoRouter.post('/', async (req, res) => {
  if (!req.body.todo) {
    return res.status(400).end()
  }

  await pool.query('INSERT INTO todos (content, done) VALUES ($1, $2)', [req.body.todo, false])
  const dbRes = await pool.query('SELECT * FROM todos')

  res.json(dbRes.rows)
})

module.exports = todoRouter