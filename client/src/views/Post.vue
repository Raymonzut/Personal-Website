<template>
  <div id="Post">
  <div v-if="Object.keys(post).length">
    <h1>{{ post.title }}</h1>
    <h5>Written on {{ post.date.substring(0,10)}}</h5>

    <p v-for="(p, i) in post.content.split('\n')" :key="i">{{ p }}</p>
  </div>
  <h2 v-else>Waiting for post</h2>
  <br>
  Read other <a href="/posts">posts</a>
  <br>
  </div> 
</template>

<script>
import { getPosts } from '../remote'

export default {
  name: "Post",
  data() { 
    return {
      post: {},
    }
  },
  methods: {
    getPosts
  },
  mounted() {
    getPosts.call(this, this._props.id)
  },
  props: {
    id: {
      type: String,
      name: "id",
      validator: val => {
        const reg = /([0-9]|[a-f]){24}/
        return reg.test(val)
      },
    }
  }
}
</script>

<style scoped></style>