<template>
<div class="row mt-5" v-if="!$store.state.loading">
    <div class="col-lg-6">
        <a href="javascript:;" @click="previousPost" v-if="hasPreviousPosts" class="float-left">
            <div>
                <strong>Previous Post</strong>
                <p>{{ $store.state.articles[currentIndex-1].title }}</p>
            </div>
        </a>
    </div>
    <div class="col-lg-6">
        <a href="javascript:;" @click="nextPost" v-if="hasNextPosts" class="float-right">
            <div>
                <strong>Next Post</strong>
                <p>{{ $store.state.articles[currentIndex+1].title }}</p>

            </div>
        </a>
    </div>
</div>
</template>
<script>
export default {
    computed: {
        hasNextPosts() {
            return this.$store.state.articles[this.currentIndex+1] !== undefined
        },
        hasPreviousPosts() {
            return this.$store.state.articles[this.currentIndex-1] !== undefined
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
    }
}
</script>
