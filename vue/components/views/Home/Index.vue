<template>
<div class="row mt-5" v-if="!$store.state.loading">
  <div class="article-preview col-lg-6 col-md-12 text-center" v-for="post in $store.state.articles">
    <router-link tag="a" :to="{name:'Post', params: { number: post.number }}">
      <h6>{{ spacetime(post.created_at, 'UTC').goto(spacetime().timezone().name).format('{day}, {date-ordinal} of {month} {year}') }}</h6>
      <h4>{{ post.title }}</h4>
      <div class="text-justify" v-html="stringLimit(post.body)"></div>
      <div class="text-center mt-4">Read More...</div>
    </router-link>
  </div>
</div>
</template>
