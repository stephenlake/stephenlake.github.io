<template>
<div>
  <top-bar-line :thickness="2" style="position: fixed;"></top-bar-line>
  <div class="container frame py-5">
    <div>
      <div v-if="!me" class="row mt-5">
        <div class="col-12">
          <center>
            <Loader />
          </center>
        </div>
      </div>
      <div v-else>
        <div class="row">
          <div class="col-12">
            <div class="media p-3">
              <img :src="me.avatar_url" alt="" class="mr-5 avatar">
              <div class="media-body">
                <h1 class="thin-title" style="font-size: 52px; line-height: 0.8">
                  <span class="font-weight-bold">{{ me.name }}</span><br>
                  <small class="font-weight-light">Developer of Internet Things</small>
                </h1>
                <div class="my-4">
                  <p style="font-size: 22px;">
                    <div class="font-weight-bolder pastey">Thoughts of a full stack web developer</div>
                    in the middle of nowhere talking to himself in the third person, creating new ideas before the last next best idea is done.
                    Obsessing over code quality. Slightly insane and insecure, but he's owning it.
                  </p>
                </div>
                <p>
                  <router-link class="button gray" tag="a" :to="{name:'Home'}" v-if="$route.path !== '/'">
                    <i class="fa fa-home fa-fw"></i> Homepage
                  </router-link>
                  <a class="button gray" target="_blank" href="https://github.com/stephenlake">
                    <i class="fa fa-github fa-fw"></i> GitHub
                  </a>
                  <a class="button gray" target="_blank" href="https://stackoverflow.com/users/2634190/stephen-lake">
                    <i class="fa fa-stack-overflow fa-fw"></i> StackOverflow
                  </a>
                  <a class="button gray" target="_blank" href="https://steamcommunity.com/id/stephenlake">
                    <i class="fa fa-steam-square fa-fw"></i> Steam
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition :duration="transitions.duration" :enterActiveClass="transitions.enterActiveClass" :leaveActiveClass="transitions.leaveActiveClass" :mode="transitions.mode">
      <router-view></router-view>
    </transition>
  </div>
</div>
</template>
<style>
.article-preview {
  cursor: pointer;
}

.article-preview h4 {
  display: inline-block;
  border-bottom: 2px solid transparent;
}

.article-preview:hover h4 {
  border-bottom: 2px dotted lime;
}

.pastey {
  display: inline-block;
  background: #96ff85;
  transform: rotate(-2deg);
  transition: all 1s;
}

.pastey:hover {
  display: inline-block;
  background: #96ff85;
  transform: rotate(2deg);
  transition: all 1s;
}

img.avatar {
  border-radius: 50%;
  transition: all 1s;
  width: 260px;
  border: 4px solid #000;
  filter: grayscale(45%);
}

img.avatar:hover {
  border-style: dotted !important;
  border-radius: 0;
  border-top-left-radius: 30%;
  border-bottom-right-radius: 30%;
  transform: scale(1.05);
  padding: 5px;
  border: 1px solid #511b1f;
  filter: grayscale(80%);
  transition: all 1s;
}
</style>
<script>
import axios from 'axios'

require('./assets/css/bootstrap.css');
require('./assets/css/style.css');
require('./assets/css/animate.css');

export default {
  created() {
    this.getArticles()
    axios.get('https://api.github.com/users/stephenlake').then((r) => {
      this.me = r.data
    })
  },
  data() {
    return {
      me: null,
      transitions: {
        duration: {
          enter: 500,
          leave: 500,
        },
        enterActiveClass: 'animated fadeIn',
        leaveActiveClass: 'animated fadeOut',
        mode: 'out-in'
      }
    }
  }
}
</script>
