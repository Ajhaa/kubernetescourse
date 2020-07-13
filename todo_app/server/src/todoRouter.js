const todoRouter = require('express').Router()

const todos = [
  { content: 'Just do it!', done: false },
  { content: 'Time to stop!', done: false }
]

todoRouter.get('/', (_, res) => {
  res.json(todos)
})

todoRouter.post('/', (req, res) => {
  if (!req.body.todo) {
    return res.status(400).end()
  }
  todos.push({ content: req.body.todo, done: false })

  res.json(todos)
})

module.exports = todoRouter