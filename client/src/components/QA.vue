<template>
  <div id='qa'>
    <Question :q='q'></Question>
    <Answer :a='a'></Answer>
  </div>
</template>

<script>
import Question from './Question.vue'
import Answer from './Answer.vue'

export default {
  name: 'QA',
  components: {
    Question,
    Answer,
  },
  props: {
    q: String,
    a: String
  }
}
</script>

<style scoped>
#qa {
  --block-spacing: 7.5em;

  margin-top: var(--block-spacing);
  margin-bottom: var(--block-spacing);
}
</style>
