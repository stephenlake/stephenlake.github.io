<template>
<div>
    <top-bar-line :thickness="5" style="position: fixed;"></top-bar-line>
    <div class="container frame py-5">
        <ImNotRightInTheHead/>
        <transition :duration="transitions.duration" :enterActiveClass="transitions.enterActiveClass" :leaveActiveClass="transitions.leaveActiveClass" :mode="transitions.mode">
            <router-view></router-view>
        </transition>
    </div>
</div>
</template>

<script>
import axios from 'axios'

require('./assets/css/bootstrap.css');
require('./assets/css/style.css');
require('./assets/css/animate.css');

export default {
    mounted() {
        this.getContent()
    },
    data() {
        return {
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
