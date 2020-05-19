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

// For the sitemap.xml, will be listed in the XML Sitemap Index
routes.set('/urls', async (req, res) => {
  const re = /(\/api\/)?(.*)\/urls/g
  const result = [...req.raw.originalUrl.matchAll(re)]
  if (!result) notFoundResponse(res)
  const endpoint = result [1] ? result[1][2] : result[0][2]
  // Assumes https
  const BASE_URL = 'https://' + req.raw.hostname + endpoint 
  const urls = posts.map(post => 
    `\n   <url>
      <loc>${BASE_URL}/${post._id}</loc>
      <lastmod>${post.date}</lastmod>
      <changefreq>never</changefreq>
      <priority>0.9</priority>
   </url>`
  ).join("\n")
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\r<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
               ${urls}\n\r</urlset>`
  res.send(xml)
})

module.exports = routes
