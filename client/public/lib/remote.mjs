export async function getPosts(id) {
    const BASE_URL = 'https://raymon.dev'
    const BASE_ENDPOINT = '/api/posts'
    const URL = BASE_URL + BASE_ENDPOINT + (id ? `/${id}` : '?sort=-1')

    let posts = []

    return await fetch(URL)
      .then(res => res.json())
      .then(res => {
        if (id !== undefined) {
          if (res === undefined) {
            throw Error("Response body empty")
          }
          return [res]
        }
        else {
          return res
        }
      })
      .catch(err => {
        console.log(`Error: ${err}`)
      })
}
