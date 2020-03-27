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
  --text-spacing: 0.75em;

  font-style: italic;
  margin-top: var(--text-spacing);
  margin-bottom: var(--text-spacing);
}
</style>
