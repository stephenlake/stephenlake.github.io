<template>
<div>
  <div class="row mt-5" v-if="!$store.state.loading">
    <div class="article-preview col-lg-6 col-md-12 text-center" v-for="(post, index) in $store.state.articles">
      <router-link tag="a" :to="{name:'Post', params: { number: post.number }}">
        <h6 :class="{ pastey: index == 0 }">
          {{ spacetime(post.created_at, 'UTC').goto(spacetime().timezone().name).format('{day}, {date-ordinal} of {month} {year}') }}
        </h6>
        <span v-if="index == 0"><br></span>
        <h4 class="font-weight-light">{{ post.title }}</h4>
        <div class="text-justify" v-html="stringLimit(post.body, 200, ' ... click here to read more')"></div>
      </router-link>
    </div>
  </div>
  <div class="row mt-5" v-if="repos.length">
    <div class="col-12 text-center mb-5 mt-5">
      <h4>Stuff I've written<br><small class="text-muted">Sadly the stuff I'm most proud of has to remain private.</small></h4>
    </div>
    <div class="col-4 text-left mb-5" v-for="repo in repos">
      <h4><span class="badge badge-theme">{{ repo.language }}</span> {{ repo.name }}</h4>
      <h6 class="text-muted">{{ repo.description }}</h6>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios'

export default {

  data() {
    return {
      repos: [],
    }
  },
  created() {
    axios.get('https://api.github.com/orgs/cloudcake/repos').then((r) => {
      this.repos = this.repos.concat(r.data)
    })

    axios.get('https://api.github.com/users/stephenlake/repos').then((r) => {
      this.repos = this.repos.concat(r.data)
    })
  }
}
</script>
