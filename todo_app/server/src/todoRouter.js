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
  try {
    const dbRes = await pool.query('SELECT * FROM todos')

    res.json(dbRes.rows)
  } catch(e) {
    res.status(500).json({ error: 'internal server error' })
  }
})

todoRouter.post('/', async (req, res) => {
  const { todo } = req.body
  if (!todo) {
    return res.status(400).json({ error: 'no todo in request body' })
  }

  if (todo.length > 140) {
    return res.status(400).json({ error: 'todo is longer than 140 characters' })
  }

  try {
    await pool.query('INSERT INTO todos (content, done) VALUES ($1, $2)', [req.body.todo, false])
  } catch(e) {
    return res.status(500).json({ error: 'internal server error' })
  }
  const dbRes = await pool.query('SELECT * FROM todos')

  res.json(dbRes.rows)
})

module.exports = todoRouter