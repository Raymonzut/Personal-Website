<template>
  <div>
    <h2>Who am I?</h2>
    <p>
      Hi there, good to see you on my website.
      My name is Raymon Zutekouw({{ age }}).
      Building software and exploring the wide variety of tools (or making them) is my passion.
      To see it in action, checkout the stuff I make on <a href="https://github.com/Raymonzut">GitHub</a>.
      The projects that may be useful to others are open source; for inspiring others and improving each others work.
      That is why I am a huge fan of <a href="https://www.gnu.org/philosophy/free-sw.en.html">free software</a>.
    </p>
  </div>
</template>

<script>
import me from '../me.js'

export default {
  name: 'aboutme',
  computed: {
    age: me.age
  }
}
</script>

<style scoped>
p {
  --margin-side: 12vw;
  margin-left: var(--margin-side);
  margin-right: var(--margin-side);
}
</style>
