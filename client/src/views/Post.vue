<template>
  <div id="Post">
  <br>
  Read other <a href="/posts">posts</a>
  <br>
  The id of the post is: {{ id }}
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