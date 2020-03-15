import Vue from 'vue'
import Axios from 'axios'
import Store from './store'
import App from './App.vue'
import Routes from './routing'
import Collect from 'collect.js'
import SpaceTime from 'spacetime'
import VueRouter from 'vue-router'
import Components from './components'

Vue.use(VueRouter)

Vue.prototype.stringLimit = function(string, limit, pattern) {
  limit = limit || 255
  pattern = pattern || '...'

  if (string.length > limit) {
    return string.substring(0, limit) + pattern
  }
  return string;
}

Vue.mixin({
  methods: {
    spacetime(date) {
      return SpaceTime(date)
    },
    getArticles() {
      this.$store.state.loading = true

      Axios.get('https://api.github.com/repos/stephenlake/stephenlake.github.io/issues?state=closed&sort=created&direction=desc').then((response) => {
        this.$store.state.articles = Collect(response.data).where('user.login', 'stephenlake')
      }).finally(() => {
        this.$store.state.loading = false
      })
    }
  }
})

window.spacetime = SpaceTime

require('bootstrap')

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router: router,
  store: Store,
  render: h => h(App)
})
