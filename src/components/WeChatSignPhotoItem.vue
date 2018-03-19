<template>
    <div class="photo-item" :style="{marginLeft: marginLeft+'px'}">
        <img v-lazy="imgUrl">
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'we-chat-sign-photo-item',
        props: {
            imgUrl: {
                type: String,
                required: true,
                default: '../../public/img/lazy_defult_img.png'
            },
            name: {
                type: String,
                required: false
            },
            marginLeft: {
                type: Number,
                required: false
            },
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .photo-item
        width 24px
        height 24px
        float: left
        margin-right 4px
        img
            width 22px
            height 22px
            margin: 1px 1px 0
</style>