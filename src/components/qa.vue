<template>
  <div id='qa'>
    <question :q='q'/>
    <answer :a='a'/>
  </div>
</template>

<script>
import question from './question.vue'
import answer from './answer.vue'

export default {
  name: 'qa',
  components: {
    question,
    answer,
  },
  props: {
    q: String,
    a: String
  }
}
</script>

<style scoped>
#qa{
  --block-spacing: 7.5em;

  margin-top: var(--block-spacing);
  margin-bottom: var(--block-spacing);
}
</style>
