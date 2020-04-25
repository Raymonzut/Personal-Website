<template>
  <div id="posts" v-if="months.length >= 0">
    <h3 class="month" v-for="(month, i) in months" :key="i">
      {{ month }}
      <div class="listAlign">
        <ul>
          <li v-for="(postItem, j) in getPostItems(month)" :key="j">
            {{ getPostItemDate(postItem) }} – {{ postItem.title }}
          </li>
        </ul>
      </div>
      <br>
    </h3>
  </div>
  <h2 v-else>There are no posts yet, but don't worry they will be added soon</h2>
</template>

<script>
import { getPosts } from '../remote'

export default {
  name: "Posts",
  computed: {
    months: function () {
      const dates = this.posts.map(post => new Date(post.date))

      // Contains the month followed by the year
      const months = dates.map(date => `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`)
      const uniques = Array.from(new Set(months))

      return uniques
    }
  },
  data() {
    return {
      posts: []
    }
  },
  methods: {
    getPosts,
    getPostItems: function (month) {
      const month_index = new Date(`1 ${month}`).getMonth()
      return this.posts.filter((post) => (new Date(post.date)).getMonth() === month_index)
    },
    getPostItemDate: function (postItem) {
      const date = new Date(postItem.date)
      return `${date.getFullYear()} ${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`
    }
  },
  mounted() {
    getPosts.call(this)
  },
}
</script>

<style scoped>
ul {
  text-align: left;
}

@media (min-width: 420px) {
  .month {
    text-indent: 1em;
    text-align: left;
  }
}
</style>