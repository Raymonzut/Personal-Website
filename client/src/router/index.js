import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Posts from '../views/Posts.vue'
import Post from '../views/Post.vue'
import QAPage from '../views/QAPage'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/posts",
    name: "Posts",
    component: Posts,
  },
  {
    path: "/posts/:id",
    name: "Post",
    component: Post,
    props: true,
  },
  {
    path: "/qa",
    name: "QA",
    component: QAPage
  },
]

const exclude_routes = [
  {
    path: "/api"
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes.concat(exclude_routes),
})

export default router
