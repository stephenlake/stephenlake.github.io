import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  articles: false,
  loading: true,
}

export default new Vuex.Store({
  state
})
