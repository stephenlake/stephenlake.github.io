<template>
<div>
  <div v-if="$store.state.loading" class="row">
    <div class="col-12">
      <center>
        <Loader />
      </center>
    </div>
  </div>
  <div v-else>
    <!-- <nav class="navbar navbar-light fixed-top bg-white">
      <span class="navbar-brand mb-0">
        <h4 class="title my-0 py-0">{{ article.title }}</h4>
        <p class="date my-0 py-0">{{ spacetime(article.created_at, 'UTC').goto(spacetime().timezone().name).format('{day}, {date-ordinal} of {month} {year} at around {time}') }} ({{ spacetime().timezone().name }})</p>
      </span>
      <top-bar-line :thickness="2"></top-bar-line>
    </nav> -->
    <div class="row">
      <div class="col-10 offset-1">
        <div class="mb-3">
          <router-link class="" tag="a" :to="{name:'Home'}">
            <i class="fa fa-home fa-fw"></i> Home
          </router-link>
        </div>
        <div class="article" v-if="article">
          <h1 class="title">{{ article.title }}</h1>
          <h4 class="date mb-5">{{ spacetime(article.created_at, 'UTC').goto(spacetime().timezone().name).format('{day}, {date-ordinal} of {month} {year} at around {time}') }} ({{ spacetime().timezone().name }})</h4>

          <div class="content" v-highlight v-html="markdownToHtml(article.body)"></div>
        </div>
        <div class="mt-5">
          <router-link class="" tag="a" :to="{name:'Home'}">
            <i class="fa fa-home fa-fw"></i> Home
          </router-link>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
let showdown = require('showdown')
let converter = new showdown.Converter({
  ghMentions: true,
  emoji: true,
  openLinksInNewWindow: true,
})

export default {
  data() {
    return {
      article: false,
    }
  },
  methods: {
    markdownToHtml(markdown) {
      return converter.makeHtml(markdown)
    },
    defineCurrentArticle() {
      this.article = this.$store.state.articles.firstWhere('id', parseInt(this.$route.params.id))

      if (!this.article) {
        this.article = this.$store.state.articles.first()
      }

      window.document.title = this.article.title
      this.track()
    }
  },
  mounted() {
    if (this.$store.state.articles) {
      this.defineCurrentArticle()
    }
  },
  watch: {
    '$store.state.articles': function(articles) {
      this.defineCurrentArticle()
    }
  }
}
</script>
