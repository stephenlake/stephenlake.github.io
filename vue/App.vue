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
      this.$store.state.loading = false
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
    }
  }
}
</script>
