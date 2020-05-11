<template>
  <div id="QAPage">
    <QA 
    q="What is this site about? "
    a="This site is about me and the stuff I make "
    ></QA>

    <QA
    q="Why is it still so empty?"
    a="Because I am framework hopping "
    ></QA>
  </div>

</template>

<script>
import QA from '@/components/QA'

export default {
  name: "QAPAge",
  components: { QA }
}
</script>

<style scoped></style>