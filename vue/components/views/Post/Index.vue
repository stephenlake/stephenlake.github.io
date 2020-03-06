<template>
<div>
    <div v-if="$store.state.loadingContent" class="row mt-5">
        <div class="col-12">
            <center>
                <Loader />
            </center>
        </div>
    </div>
    <div v-else>
        <MiniPagination/>
        <div class="row mt-3">
            <div class="col-12">
                <div class="article" v-if="$store.state.article">
                    <h1 class="title">{{ article.title }}</h1>
                    <h4 class="date mb-5">{{ spacetime(article.created_at, 'UTC').goto(spacetime().timezone().name).format('{day}, {date-ordinal} of {month} {year} at around {time}') }} ({{ spacetime().timezone().name }})</h4>
                    <div class="content" v-html="markdownToHtml(article.body)"></div>
                </div>
            </div>
        </div>
        <MiniPagination/>
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
    methods: {
        markdownToHtml(markdown) {
            return converter.makeHtml(markdown)
        }
    }
}
</script>
