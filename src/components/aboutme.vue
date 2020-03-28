<template>
  <div>
    {{ age }}
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
