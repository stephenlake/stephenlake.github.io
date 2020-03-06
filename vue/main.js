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
Vue.mixin({
    data() {
        return {
            currentIndex: parseInt(this.$route.query.index || 0),
        }
    },
    computed: {
        article() {
            return this.$store.state.article
        }
    },
    watch: {
        '$route.query.index': function(index) {
            this.currentIndex = index
            this.getArticles()
        }
    },
    methods: {
        spacetime(date) {
            return SpaceTime(date)
        },
        getArticles() {
            this.$store.state.loadingContent = true

            Axios.get('https://api.github.com/repos/stephenlake/stephenlake.github.io/issues?state=closed&sort=created&direction=desc').then((response) => {
                this.$store.state.index = Collect(response.data).where('user.login', 'stephenlake').all()
                this.$store.state.article = this.$store.state.index[this.currentIndex]
                window.document.title = this.$store.state.article.title
            }).finally(() => {
                this.$store.state.loadingContent = false
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
