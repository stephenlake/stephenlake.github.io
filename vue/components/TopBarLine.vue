<template>
<div class="topbar" :style="{  height: `${thickness}px`, background: `linear-gradient(${direction}, ${startColour}, ${endColour})` }"></div>
</template>
<script>
export default {
    props: {
        thickness: {
            type: Number,
            default: 1
        },
        startColour: {
            type: String,
            default: '#96ff85'
        },
        endColour: {
            type: String,
            default: '#1d2730'
        },
        direction: {
            type: String,
            default: 'to right',
        }
    }
}
</script>
<style>
.topbar {
    width: 100%;
    top: 0;
    left: 0;
    z-index: 9999;
}
</style>
