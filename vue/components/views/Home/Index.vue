<template>
<div>
  <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
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
        <div class="col-lg-4 col-sm-12 mb-4 text-xs-center text-sm-center text-md-center text-lg-left">
          <center>
            <img :src="$store.state.me.avatar_url"
              alt=""
              class="avatar">
          </center>
        </div>
        <div class="col-lg-8 col-sm-12">
          <h1 class="thin-title"
            style="font-size: 52px; line-height: 0.8">
            <span class="font-weight-bold">{{ $store.state.me.name }}</span><br>
            <small class="font-weight-light">Developer of Internet Things</small>
          </h1>
          <div class="my-md-4 my-0">
            <p style="font-size: 22px;">
              <div class="font-weight-bolder pastey">Stuff of a full stack web developer</div>
              in the middle of nowhere talking to himself in the third person, creating new ideas before the last next best idea is done.
              Obsessing over code quality. Slightly insane and insecure, but he's owning it.
            </p>
            <p>
              View my stuff on <a class="btn p-0 m-0 font-weight-bold"
                title="GitHub"
                target="_blank"
                href="https://github.com/stephenlake">
                <i class="fa fa-github fa-fw"></i> Github
              </a> or view my <a class="btn p-0 m-0 font-weight-bold"
                title="Steam Group"
                target="_blank"
                href="https://steamcommunity.com/groups/developerrants">
                <i class="fa fa-steam fa-fw"></i> Steam group
              </a> to join in on some chat.</p>
          </div>
        </div>
      </div>
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
  }
}
</script>
