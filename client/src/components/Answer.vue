<template>
  <div>
    {{ a }}
  </div>
</template>

<script>
export default {
  name: 'Answer',
  props: {
    a: {
      type: String,
      required: true,
    }
  }
}
</script>

