<template>
<div>
    <div class="row mt-5">
        <div class="col-12">
            <div class="article" v-if="$store.state.article">
                <h4 class="date">{{ spacetime(article.created_at).format('nice') }}</h4>
                <h1 class="title">{{ article.title }}</h1>
                <div class="content" v-html="markdownToHtml(article.body)"></div>
            </div>
        </div>
    </div>
    <div class="row mt-5">
        <div class="col-lg-6">
            <a href="javascript:;" @click="previousPost" v-if="currentIndex > 0" class="float-left">
                <strong>Previous Post</strong>
            </a>
        </div>
        <div class="col-lg-6">
            <a href="javascript:;" @click="nextPost" v-if="currentIndex < ($store.state.index.length-1)" class="float-right">
                <strong>Newer Post</strong>
            </a>
        </div>
    </div>
</div>
</template>
<script>
let showdown = require('showdown')
let converter = new showdown.Converter({
    ghMentions: true,
    emoji: true,
})

export default {
    methods: {
        markdownToHtml(markdown) {
            return converter.makeHtml(markdown)
        },
        previousPost() {
            this.$router.replace({
                query: {
                    index: parseInt(this.currentIndex - 1)
                }
            })
        },
        nextPost() {
            this.$router.replace({
                query: {
                    index: parseInt(this.currentIndex + 1)
                }
            })
        }
    },
    watch: {
        '$store.state.article': function(article) {
            if (article) {
                window.document.title = article.title
            }
        }
    }
}
</script>
