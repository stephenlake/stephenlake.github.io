<template>
<div>
  <div>
    <div v-if="$store.state.loading || !$store.state.me"
      class="row mt-5">
      <div class="col-12">
        <center>
          <Loader />
        </center>
      </div>
    </div>
    <div v-else>
      <div class="row">
        <div class="col-lg-3 col-sm-12 mb-4 text-xs-center text-sm-center text-md-center text-lg-left">
          <center>
            <img :src="$store.state.me.avatar_url"
              alt=""
              class="avatar">
          </center>
        </div>
        <div class="col-lg-9 col-sm-12">
          <h1 class="thin-title"
            style="font-size: 52px; line-height: 0.8">
            <span class="font-weight-bold">{{ $store.state.me.name }}</span><br>
            <small class="font-weight-light">Developer of Internet Things</small>
          </h1>
          <div class="my-md-4 my-0"
            title="This is my blog where I talk about stuff that matters to me.">
            <p style="font-size: 22px;">
              <div class="font-weight-bolder pastey">Thoughts of a full stack web developer</div>
              in the middle of nowhere talking to himself in the third person, creating new ideas before the last next best idea is done.
              Obsessing over code quality. Slightly insane and insecure, but he's owning it.
            </p>
          </div>
          <p class="d-md-block d-none">
            <a class="btn"
              title="GitHub"
              target="_blank"
              href="https://github.com/stephenlake">
              <i class="fa fa-github fa-fw"></i>
            </a>
            <a class="btn"
              title="LinkedIn"
              target="_blank"
              href="https://www.linkedin.com/in/stephenllake">
              <i class="fa fa-linkedin fa-fw"></i>
            </a>
            <a class="btn"
              title="StackOverflow"
              target="_blank"
              href="https://stackoverflow.com/users/2634190/stephen-lake">
              <i class="fa fa-stack-overflow fa-fw"></i>
            </a>
            <a class="btn"
              title="Steam"
              target="_blank"
              href="https://steamcommunity.com/id/stephenlake">
              <i class="fa fa-steam-square fa-fw"></i>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-5 mb-5"
    v-if="!$store.state.loading">
    <div class="article-preview col-lg-12 text-left mb-5"
      v-for="(post, index) in $store.state.articles">
      <router-link tag="a"
        :to="{name:'ShortPost', params: { id: post.id }}">
        <h6 :class="{ pastey: index == 0 }">
          {{ spacetime(post.created_at, 'UTC').goto(spacetime().timezone().name).format('{day}, {date-ordinal} of {month} {year}') }}
        </h6>
        <span v-if="index == 0"><br></span>
        <h4 class="font-weight-light">
          <span class="tag"
            v-for="tag in articleTags(post)"
            :style="{color: `#${tag.color}`}">{{ tag.extra.title }}</span>
          {{ post.title }}
        </h4>
        <div class="text-justify"
          v-html="stringLimit(post.body, 700, ' ... Read Further.')"></div>
      </router-link>
    </div>
  </div>
</div>
</template>
<script>
import Collect from 'collect.js'

export default {
  mounted() {
    window.document.title = 'Homepage'
    this.track()
  },
  methods: {
    articleTags(article) {
      return this.collect(article.labels).transform((label) => {
        label.extra = JSON.parse(label.description)
        return label
      }).all()
    }
  }
}
</script>
