import { getPosts } from "./lib/remote.mjs"

function toMonthYearString(str) {
    const date = new Date(str)
    return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`
}
async function showPost(id) {
  const post_list = await getPosts(id)
  const post = post_list[0]
  const title = document.createElement("h1")
  title.textContent = post.title

  const postsDOM = document.getElementById("posts")
  postsDOM.appendChild(title)

  post.content.split('\n').forEach(paragraph => {
    const p = document.createElement("p")
    p.innerHTML = paragraph
    postsDOM.appendChild(p)
  });
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
        post_DOM.textContent = `${post.date.substring(0, 10)} - `

        const post_link = document.createElement("a")
        post_link.href = 'posts?post=' + post._id
        post_link.textContent = post.title
        post_DOM.appendChild(post_link)

        month_DOM.appendChild(post_DOM)
    })

    postsDOM.appendChild(month_DOM)
  })
}

// Check if a specific post is requested
let url = new URL(document.location.href);
url.searchParams.sort();
let post_id = url.searchParams.values().next().value;

const reg = /([0-9]|[a-f]){24}/
if (post_id && reg.test(post_id)) showPost(post_id)
else updatePosts()
