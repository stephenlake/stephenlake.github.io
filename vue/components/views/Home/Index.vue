<template>
<div>
  <div class="row mt-5" v-if="!$store.state.loading">
    <div class="article-preview col-lg-6 col-md-12 text-center mb-5" v-for="(post, index) in $store.state.articles">
      <router-link tag="a" :to="{name:'ShortPost', params: { id: post.id }}">
        <h6 :class="{ pastey: index == 0 }">
          {{ spacetime(post.created_at, 'UTC').goto(spacetime().timezone().name).format('{day}, {date-ordinal} of {month} {year}') }}
        </h6>
        <span v-if="index == 0"><br></span>
        <h4 class="font-weight-light">{{ post.title }}</h4>
        <div class="text-justify" v-html="stringLimit(post.body, 200, ' ... click here to read more')"></div>
      </router-link>
    </div>
  </div>
  <div class="row mt-5" v-if="$store.state.repos.length">
    <div class="col-lg-12 text-left mb-5" v-for="(group, language, index) in groupedRepos">
      <div class="row">
        <div class="col-12 mb-4">
          <h4><span class="badge badge-theme">{{ language }}</span></h4>
        </div>
        <div class="col-lg-4 col-md-12 text-left mb-3" v-for="repo in group">
          <h4>
            <a :href="repo.html_url" target="_blank">
              {{ repo.name }}
            </a>
          </h4>
          <h6 class="text-muted">{{ repo.description }}</h6>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import Collect from 'collect.js'

export default {
  computed: {
    groupedRepos() {
      return Collect(this.$store.state.repos).sortBy('language').groupBy('language').all()
    },
  },
  mounted() {
    window.document.title = 'Homepage'
    this.track()
  }
}
</script>
