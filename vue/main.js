import Vue from 'vue'
import Axios from 'axios'
import Store from './store'
import App from './App.vue'
import Routes from './routing'
import VueRouter from 'vue-router'
import Components from './components'

Vue.use(VueRouter)
Vue.mixin({
    data() {
        return {
            currentIndex: this.$route.query.index || 0,
        }
    },
    watch: {
        '$route.query.index': function(index) {
            this.currentIndex = index
            this.getContent()
        }
    },
    methods: {
        getContent() {
            const that = this

            Axios.get('/content/').then((response) => {
                that.$store.state.index = response.data.sort().reverse()

                Axios.get(`/content/${this.$store.state.index[that.currentIndex]}`).then((response) => {
                    that.$store.state.content = response.data
                })
            })
        }
    }
})

require('bootstrap')

window.api = Axios.create({
    'headers': {
        'X-Requested-With': 'XMLHttpRequest',
    }
})

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
