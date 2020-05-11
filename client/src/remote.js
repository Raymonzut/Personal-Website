module.exports = {
  getPosts: function(id) {
    const BASE_URL = '/api/posts'
    const URL = BASE_URL + (id ? `/${id}` : '?sort=-1')

    this.$http
      .get(URL)
      .then(res => {
        if (id) {
          if (res.body.length === 0) {
            throw Error("Response body empty")
          }
          this.post = res.body
        }
        else {
          this.posts = res.body
        }
      })
      .catch(err => {
        console.log(`Error: ${err}`)
      })
  },
}
