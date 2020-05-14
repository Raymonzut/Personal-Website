const fastify = require('fastify')()

fastify.register(require('fastify-cors'))

const posts = require('./routes/api/posts')

// Assuming they are all get requests
for (let [route, resolver] of posts.entries()) {
  fastify.get('/posts' + route, resolver)
}

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await fastify.listen(port)
    console.log(`Launched on port ${port} 🚀`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
