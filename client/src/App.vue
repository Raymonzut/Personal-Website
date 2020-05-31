<template>
<div id="app" :class="theme">
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/posts">Posts</router-link> |
    <router-link to="/qa">QA</router-link>
  </div>
  <router-view />
  <div>
  <button @click="toggleTheme">{{ themeToggleVerb }} my eyes</button>
  </div>
</div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      theme: 'dark'
    }
  },
  computed: {
	themeToggleVerb: function() {
          return this.theme === 'light' ? "Save" : "Hurt"
        }
  },

  methods: {
    toggleTheme() {
      const themes = ['light', 'dark']
      this.theme = themes[(themes.indexOf(this.theme) + 1) % themes.length]
    }
  },
}
</script>

<style>

.light {
  --primary-color: #ffffeb;
  --text-color: #272736;
}

.dark {
  --primary-color: #272736;
  --text-color: #ffffeb;
}

.dark a {
  color: #7e7e8f;
}

body {
  background-color: var(--primary-color);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-color);
  padding-top: 60px;
  background-color: var(--primary-color);
  min-height: 100vh;
}

</style>

