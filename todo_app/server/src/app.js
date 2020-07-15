const express = require('express')
const cors = require('cors')
const imageRouter = require('./imageRouter')
const todoRouter = require('./todoRouter')
const logger = require('./logger')

const app = express()
app.use(cors())
app.use(express.json())

app.use(logger)

app.use('/api/image', imageRouter)
app.use('/api/todos', todoRouter)

app.get('/api', (_, res) => {
  res.json({ message: 'hello from root' })
})

app.listen(3000, () => {
  console.log('listening in 3000')
})