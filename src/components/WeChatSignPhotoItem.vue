<template>
    <div class="photo-item" :style="{marginLeft: marginLeft+'px'}">
        <img v-lazy="imgUrl" :id="'user-'+userid" class="photo-item-img" :alt="name">
        <!--<p class="photo-item-name">{{name}}</p>-->
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
            // 用户id
            userid: {
                type: Number,
                required: true
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
        .photo-item-img
            display block
            width 22px
            height 22px
            margin: 1px 1px 0
            border: 1px solid #7a0402;
            padding: 1px;
            border-radius: 3px;
            background-color: #dbb756;
        /*.photo-item-name*/
            /*color #fff*/
            /*font-size 12px*/
            /*display none*/
            /*text-align center*/
</style>