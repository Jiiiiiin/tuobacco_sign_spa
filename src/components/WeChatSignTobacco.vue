<template>
    <div class="wechat-sign-tobacco" ref="wechatSignDiv">
        <!--<div class="bg">-->
        <img class="bg-img" src="../assets/img-bg.jpg" ref="bgImg">
        <h1>hahaha</h1>
        <!--</div>-->
    </div>
</template>

<script type="text/ecmascript-6">

    export default {
        name: 'HelloWorld',
        methods: {
            _initStyleOnPageLoad() {
                this.$nextTick(() => {
                    // const clientWidth = document.body.clientWidth
                    // const last = clientWidth * 0.25
                    // const bgImg = this.$refs.bgImg
                    // // bgImg.width = clientWidth - last
                    // // !以防存在兼容性问题预留
                    // const clientHeight = document.body.clientHeight
                    // console.log(clientHeight, clientWidth)
                    // bgImg.height = `${clientHeight}px`
                    // const pageMarginLeft = `${last / 2}px`
                    // const wechatSignDiv = this.$refs.wechatSignDiv
                    // wechatSignDiv.style.paddingLeft = pageMarginLeft
                })

                setTimeout(()=>{
                    const bgImg = this.$refs.bgImg
                    // bgImg.width = clientWidth - last
                    // !以防存在兼容性问题预留
                    const clientHeight = document.body.clientHeight
                    console.log(clientHeight)
                    bgImg.height = `${clientHeight}px`
                }, 100)
            }
        },
        mounted() {
            this._initStyleOnPageLoad()
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .wechat-sign-tobacco
        width 100%
        /*.bg-img*/
            /*position absolute*/
            /*top 0*/
            /*bottom 0*/


    /*.bg*/
    /*width 100%*/
    /*height auto*/
    /*background-image url("../assets/img-bg.jpg")*/
    /*background-size 100% 100%*/
    /*background-repeat no-repeat;*/
</style>
