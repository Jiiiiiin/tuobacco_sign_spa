<template>
    <div class="photo-row" :style="{marginLeft: marginLeft+'px', marginTop: marginTop+'px'}">
        <we-chat-sign-photo-item
                :img-url="item.headimgurl"
                :name="item.username"
                :userid="item.id"
                :marginLeft="item.marginLeft"
                v-for="item in itemData"
                :key="item.id"></we-chat-sign-photo-item>
    </div>
</template>

<script type="text/ecmascript-6">
    import WeChatSignPhotoItem from './WeChatSignPhotoItem.vue'
    export default {
        name: 'we-chat-sign-photo-item-box',
        components: {
            'we-chat-sign-photo-item': WeChatSignPhotoItem
        },
        props: {
            itemData: {
                type: Array,
                required: true
            },
            marginLeft: {
                type: Number,
                required: false
            },
            marginTop: {
                type: Number,
                required: false
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .photo-row
        height 24px
</style>