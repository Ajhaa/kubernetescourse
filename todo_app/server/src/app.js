const express = require('express')
const axios = require('axios')
const moment = require('moment')
const fs = require('fs')
const { existsSync } = fs
const { writeFile, readFile } = fs.promises

const app = express()
app.use(express.static('public'))


const PATH = './shared/'
const IMG_PATH = PATH + 'image.jpeg'
const NEXT_IMG_PATH = PATH + 'next_img_stamp.txt'

async function cacheDate (date) {
  writeFile(NEXT_IMG_PATH, date.toISOString())
}


app.get('/api', (req, res) => {
  res.json({ message: 'hello from root' })
})

app.get('/api/image', async (req, res) => {
  res.setHeader('Content-Type', 'image/jpeg')
  
  if (!existsSync(NEXT_IMG_PATH)) {
    await cacheDate(moment().subtract(30, 'seconds'))
  }

  const nextImage = (await readFile(NEXT_IMG_PATH)).toString()

  if (moment(nextImage).isBefore(moment())) {
    await cacheDate(moment().add(1, 'day'))

    const number = Math.floor(Math.random() * 3000)
    console.log('fetching image ', number)

    const response = await axios.get(`https://picsum.photos/${number}`, {
      responseType: 'arraybuffer'
    })

    await writeFile(IMG_PATH, response.data)

    res.write(response.data)
    return res.end()
  }

  console.log('using cached image')
  const image = await readFile(IMG_PATH)

  res.write(image)
  res.end()
})

app.listen(3000, () => {
  console.log('listening in 3000')
})