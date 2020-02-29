<template>
<div>
    <div class="row mt-5">
        <div class="col-10">
            <div class="article" v-if="$store.state.content" v-html="article"></div>
        </div>
        <div class="col-2">
            <div style=""></div>
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
    computed: {
        article() {
            if (this.$store.state.content) {
                return converter.makeHtml(this.$store.state.content)
            }
            return false
        }
    },
    methods: {
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
        '$store.state.content': function(content) {
            if (content.length) {
                setTimeout(() => {
                    let titleElement = document.querySelector('.article h1:first-of-type')
                    let titleContent = titleElement.innerText

                    window.document.title = titleContent
                }, 500)
            }
        }
    }
}
</script>
