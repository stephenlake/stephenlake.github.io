import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    index: 0,
    content: false,
}

export default new Vuex.Store({
    state
})
