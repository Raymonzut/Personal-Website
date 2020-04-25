<template>
  <div id="Post">
  <br>
  Read other <a href="/posts">posts</a>
  <br>
  The id of the post is: {{ id }}
  </div> 
</template>

<script>
export default {
  name: "Post",
  props: {
    id: {
      type: String,
      name: "id",
    }
  }
}
</script>

<style scoped></style>