<template>
<div>
  <div v-if="$store.state.loading" class="row mt-5">
    <div class="col-12">
      <center>
        <Loader />
      </center>
    </div>
  </div>
  <div v-else>
    <div class="row mt-5">
      <div class="col-10 offset-1">
        <div class="article" v-if="article">
          <h1 class="title">{{ article.title }}</h1>
          <h4 class="date mb-5">{{ spacetime(article.created_at, 'UTC').goto(spacetime().timezone().name).format('{day}, {date-ordinal} of {month} {year} at around {time}') }} ({{ spacetime().timezone().name }})</h4>
          <div class="content" v-html="markdownToHtml(article.body)"></div>
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
      this.article = this.$store.state.articles.firstWhere('number', parseInt(this.$route.params.number))

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
