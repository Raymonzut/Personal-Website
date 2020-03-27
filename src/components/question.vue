<template>
  <div id='question_box'>
    {{ q }}
  </div>
</template>

<script>
export default {
  name: 'question',
  props: {
    q: String
  }
}
</script>

<style scoped>
#question_box {
  font-style: italic;
}
</style>
