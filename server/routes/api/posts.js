const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

const DB_NAME = process.env.DB_NAME || 'test'
const URI = process.env.URI || 'mongodb://localhost:27017'

async function getPostCollection() {
  const client = await mongodb.MongoClient.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  return client.db(DB_NAME).collection('posts')
}

router.get('/', async (req, res) => {
  const posts = await getPostCollection()
  res.send(await posts.find({}).toArray())
})

router.get('/:id', async (req, res) => {
  const re = /[0-9A-Fa-f]{24}/g

  if (!re.test(req.params.id)) {
    res.status(404).send('Sorry, can not find that')
    return
  }

  const posts = await getPostCollection()
  res.send(await posts.find({ _id: mongodb.ObjectID(req.params.id) }).toArray())
})

module.exports = router
