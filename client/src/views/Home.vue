<template>
<div id="home">
  <h1>Home</h1>
  <aboutme/>
</div>
</template>

<script>
import aboutme from '@/components/aboutme'

export default {
  name: "Home",
  components: {
    aboutme
  },
}
</script>

<style scoped></style>
