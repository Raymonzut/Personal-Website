const fs = require('fs')

const posts_dir = 'posts/'

const routes = new Map();

if (!fs.existsSync(posts_dir)) throw Error(`Missing ${posts_dir}`)

let posts = readPosts();

setInterval(() => posts = readPosts(), 1000 * 60 * 60)

function readPosts() {
  console.warn("reading all posts")
  const files = fs.readdirSync(posts_dir)

  if (files.length === 0) throw Error(`Could not find posts in ${posts_dir}`)
  
  return files.filter(file_name => file_name.endsWith('.json'))
              .map(file_name => `${posts_dir}${file_name}`)
              .map(readJSONAsObject)
}

function readJSONAsObject(filename) {
  return JSON.parse(fs.readFileSync(filename, 'utf8'))
}

function notFoundResponse(res) {
  res.status(404).send('Sorry, can not find that')
}

routes.set('', async (req, res) => {
  if (req.query.sort === '-1' || req.query.sort === '1') {
    const posts_sorted = posts.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
    
    if (req.query.sort === '1') res.send(posts_sorted) 
    else res.send(posts_sorted.reverse())
  }
})

routes.set('/:id', async (req, res) => {
  const re = /[0-9A-Fa-f]{24}/g

  if (!re.test(req.params.id)) {
    notFoundResponse(res)
    return
  }
  const results = posts.filter(post => post._id === req.params.id)

  if (!results.length) notFoundResponse(res) 
  else res.send(results[0])
})

module.exports = routes
