<template>
<div>
  <top-bar-line :thickness="2"
    style="position: fixed;"></top-bar-line>
  <div class="container frame py-5">
    <transition :duration="transitions.duration"
      :enterActiveClass="transitions.enterActiveClass"
      :leaveActiveClass="transitions.leaveActiveClass"
      :mode="transitions.mode">
      <router-view></router-view>
    </transition>
  </div>
</div>
</template>
<script>
import Axios from 'axios'

require('./assets/css/bootstrap.css');
require('./assets/css/style.css');
require('./assets/css/animate.css');

export default {
  created() {
    this.$store.state.loading = true
    this.getPersona().then((r) => {
      this.getArticles().then((r) => {
        setTimeout(() => {
          this.$store.state.loading = false
        }, 500)
      })
    })
  },
  data() {
    return {
      transitions: {
        duration: {
          enter: 500,
          leave: 500,
        },
        enterActiveClass: 'animated fadeIn',
        leaveActiveClass: 'animated fadeOut',
        mode: 'out-in'
      }
    }
  },
  methods: {
    getPersona() {
      return new Promise((resolve, reject) => {
        Axios.get('https://api.github.com/users/stephenlake').then((r) => {
          this.$store.state.me = r.data
          resolve(r)
        }).catch((e) => {
          reject(e)
        })
      })
    },
    getArticles(tags) {
      return new Promise((resolve, reject) => {
        let url = 'https://api.github.com/repos/stephenlake/stephenlake.github.io/issues?sort=created&direction=desc'

        if (process.env.NODE_ENV === 'production') {
          url += '&state=closed'
        } else {
          url += '&state=all'
        }

        Axios.get(url).then((r) => {
          this.$store.state.articles = this.collect(r.data).where('user.login', 'stephenlake')
          resolve(r)
        }).catch((e) => {
          reject(e)
        })
      })
    }
  }
}
</script>
