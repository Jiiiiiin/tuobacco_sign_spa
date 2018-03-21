<template>
    <div class="wechat-sign-tobacco">
        <div class="item-logo">
            <img class="logo-img" v-lazy="logoBg" alt="云南中烟">
        </div>
        <div class="box">
            <h1 class="err-h1 ">您访问的资源未找到，请确认浏览器输入的地址是否正确？<br><p style="display: block">如需帮助，请联系：jiiiiiin@yeah.net</p></h1>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'GlobalErr',
        data() {
            return {
                logoBg: `${this.$vp.options.appUrl}/img/logo-ty.png`,
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .wechat-sign-tobacco
        position: absolute
        top: 0
        bottom: 0
        width 100%
        background-color: #7a0402
        .item-logo
            position: absolute;
            top: 0;
            right: 0;
            .logo-img
                width 600px
        .box
            display: flex
            background-color: #7a0402
            align-items: center; /*垂直居中*/
            justify-content: center; /*水平居中*/
            height: 100%;
            .err-h1
                font-size 26px
                color #ffffff
            p
                text-align center
                font-size 15px
                margin-top 20px
</style>
