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

import 'prism-es6/components/prism-markup-templating'
import 'prism-es6/components/prism-markup'
import 'prism-es6/components/prism-bash'
import 'prism-es6/components/prism-php'
import 'prism-es6/components/prism-css'

require('../node_modules/vue-code-highlight/themes/duotone-sea.css')
require('../node_modules/vue-code-highlight/themes/window.css')

Vue.use(VueCodeHighlight)
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
    collect(c) {
      return Collect(c)
    }
  }
})

window.spacetime = SpaceTime

let router = new VueRouter({
  routes: Routes,
  mode: 'hash'
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  next()
})

new Vue({
  el: '#app',
  router: router,
  store: Store,
  render: h => h(App)
})
