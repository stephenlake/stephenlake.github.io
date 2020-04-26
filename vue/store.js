import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  me: false,
  loading: true,
}

export default new Vuex.Store({
  state
})
