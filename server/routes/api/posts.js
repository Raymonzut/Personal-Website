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
    return
  }
  // Default response when there are no interesting queries
  res.send(posts)
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

// Dynamic RSS feed
routes.set('/rss.xml', async (req, res) => {
  const re = /(\/api\/)?(.*)\/rss/g
  const result = [...req.raw.originalUrl.matchAll(re)]
  if (!result) {
    notFoundResponse(res)
    return
  }

  const endpoint = result [1] ? result[1][2] : result[0][2]
  // Assumes https
  const BASE_URL = 'https://' + req.raw.hostname + endpoint
  const ITEMS = posts.map(post =>
    `\r\n    <item>
      <title>${post.title}</title>
      <link>https://${req.raw.hostname}/posts?post=${post._id}</link>
      <guid>https://${req.raw.hostname}/posts?post=${post._id}</guid>
      <description><![CDATA[${"\n" + post.content.split("\n").reduce((acc, v) => acc + "<p>" + v + "</p>")}]]></description>
      <content type="html">CONTENT HERE: ${post.content}</content>
      <pubDate>${post.date}</pubDate>
    </item>`
  ).join("\n")
  const xml = `<?xml version="1.0" encoding="UTF-8" ?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <atom:link href="https://${req.raw.hostname}/api/posts/rss.xml" rel="self" type="application/rss+xml" />
    <title>Posts</title>
    <link>https://${req.raw.hostname}</link>
    <description>Personal blog</description>
    <language>en-us</language>
    ${ITEMS}
  </channel>\n</rss>`

  res.header('Content-Type', 'application/xml')
  res.status(200).send(xml)
})

module.exports = routes
