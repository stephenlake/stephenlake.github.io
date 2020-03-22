import Vue from 'vue'
import Axios from 'axios'
import Store from './store'
import App from './App.vue'
import Routes from './routing'
import Collect from 'collect.js'
import SpaceTime from 'spacetime'
import VueRouter from 'vue-router'
import Components from './components'
import VueAnalytics from 'vue-analytics'
import VueCodeHighlight from 'vue-code-highlight'

// Code Highlighting
Vue.use(VueCodeHighlight)

import 'prism-es6/components/prism-markup-templating'
import 'prism-es6/components/prism-markup'
import 'prism-es6/components/prism-bash'
import 'prism-es6/components/prism-php'
import 'prism-es6/components/prism-css'

require('../node_modules/vue-code-highlight/themes/duotone-sea.css')
require('../node_modules/vue-code-highlight/themes/window.css')

Vue.use(VueRouter)
Vue.use(VueAnalytics, {
  id: 'UA-134646363-1'
})

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
    track() {
      this.$ga.page(this.$route.path)
    },
    spacetime(date) {
      return SpaceTime(date)
    },
    getEverything() {
      this.$store.state.loading = true

      let url = 'https://api.github.com/repos/stephenlake/stephenlake.github.io/issues?sort=created&direction=desc'

      if (process.env.NODE_ENV === 'production') {
        url += '&state=closed'
      } else {
        url += '&state=all'
      }

      Axios.get('https://api.github.com/users/stephenlake').then((r) => {
        this.$store.state.me = r.data
      })

      Axios.get(url).then((response) => {
        this.$store.state.articles = Collect(response.data).where('user.login', 'stephenlake')
      }).finally(() => {
        this.$store.state.loading = false
      })

      Axios.get('https://api.github.com/orgs/cloudcake/repos').then((r) => {
        this.$store.state.repos = this.$store.state.repos.concat(r.data)
      })

      Axios.get('https://api.github.com/users/stephenlake/repos').then((r) => {
        this.$store.state.repos = this.$store.state.repos.concat(r.data)
      })
    }
  }
})

window.spacetime = SpaceTime

let router = new VueRouter({
  routes: Routes,
  mode: 'hash'
})

router.beforeEach((to, from, next) => {
  next()

  window.scrollTo(0, 0)
})

new Vue({
  el: '#app',
  router: router,
  store: Store,
  render: h => h(App)
})
