import { getPosts } from "./lib/remote.mjs"

function toMonthYearString(str) {
    const date = new Date(str)
    return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`
}

async function updatePosts() {
  const posts = await getPosts()

  const months = posts.map(post => toMonthYearString(post.date))
  const uniques = Array.from(new Set(posts.map(post => toMonthYearString(post.date))))
  const month_lists = uniques.map(month =>
    posts.filter(
      post => toMonthYearString(post.date) === month
    )
  )
  const postsDOM = document.getElementById("posts")
  uniques.forEach((month, i) => {
    const month_DOM = document.createElement("h1")
    month_DOM.textContent = month

    month_lists[i].forEach((post, i) => {
        const post_DOM = document.createElement("h6")
        post_DOM.textContent = `${post.date.substring(0, 10)} - ${post.title}`
        month_DOM.appendChild(post_DOM)
    })

    postsDOM.appendChild(month_DOM)
  })
}

updatePosts()
