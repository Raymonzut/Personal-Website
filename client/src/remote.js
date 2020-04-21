module.exports = {
  getPosts: function() {
    this.$http
      .get('http://localhost:5000/api/posts?sort=1')
      .then(res => {
        this.posts = res.body
      })
      .catch(err => {
        console.log(`Error: ${err}`)
      })
  },
}
