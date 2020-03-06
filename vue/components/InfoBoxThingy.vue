<template>
<div>
    <div v-if="!me" class="row mt-5">
        <div class="col-12">
            <center>
                <Loader />
            </center>
        </div>
    </div>
    <div v-else>
        <a href="https://github.com/stephenlake" target="_blank">
            <div class="media border p-3">
                <img :src="me.avatar_url" alt="" class="mr-3 mt-1 rounded-circle" style="width:60px;">
                <div class="media-body">
                    <h4>
                        {{ me.name }}
                        -
                        <small>
                            <i>{{ me.company }}</i>
                            <br>
                            {{ me.location }}
                        </small>
                    </h4>
                    <p v-html="me.bio" v-if="me.bio"></p>
                </div>
            </div>
        </a>
    </div>
</div>
</template>
<script>
import axios from 'axios'

export default {
    data() {
        return {
            me: null,
        }
    },
    created() {
        axios.get('https://api.github.com/users/stephenlake').then((r) => {
            this.me = r.data
        })
    }
}
</script>
