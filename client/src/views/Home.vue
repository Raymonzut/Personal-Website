<template>
<div id="home">
  <h1>Home</h1>
  <AboutMe></AboutMe>
</div>
</template>

<script>
import AboutMe from '@/components/AboutMe'

export default {
  name: "Home",
  components: {
    AboutMe
  },
}
</script>

<style scoped></style>
