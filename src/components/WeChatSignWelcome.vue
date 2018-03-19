<template>
    <div class="wechat-sign-tobacco">
        <div class="item-logo">
            <img class="logo-img" v-lazy="logoBg" alt="云南中烟">
        </div>
        <div class="box">
            <h1 class="err-h1">欢迎页面</h1> <br>
            <router-link :to="mainUrl">Go to Main</router-link>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import qs from 'qs'

    export default {
        name: 'WeChatSignWelcome',
        data() {
            return {
                logoBg: `${this.$vp.options.appUrl}/img/logo-ty.png`,
                mainUrl: '/Error',
                meetingId: NaN,
                sessionId: NaN
            }
        },
        created() {
            const _urlParams = ((_temp) => {
                return _temp ? qs.parse(_temp.substring(1, _temp.length)) : null
            })(window.location.search)
            console.log('_urlParams', _urlParams, window.location.search)
            if(!_urlParams || _urlParams === null){
                this.$router.push({ name: 'Error'})
            } else {
                this.meetingId = _urlParams.meetingId
                this.sessionId = _urlParams.sessionId
                this.mainUrl = `/WeChatSignTobacco/${this.meetingId}/${this.sessionId}`
            }
        },
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
                width 900px
        .box
            display: flex
            background-color: #7a0402
            align-items: center; /*垂直居中*/
            justify-content: center; /*水平居中*/
            width: 85%;
            height: 100%;
            .err-h1
                font-size 26px
                color #ffffff
                display block
</style>
