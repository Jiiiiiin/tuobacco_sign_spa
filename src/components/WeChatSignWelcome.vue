<template>
    <div class="wechat-sign-tobacco">
        <div class="box">
            <div class="bg-box"
                 v-lazy:background-image="welcomeBg">
                <!--<h1 class="err-h1">欢迎页面</h1> <br>-->
                <!--<div class="url-box">-->
                <!--<router-link :to="mainUrl" class="go-to-home-btn">进入签到主页</router-link>-->
                <!--</div>-->
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {Notification} from 'element-ui'

    const ERR_DIALOG_TITLE = '开小差了'

    export default {
        name: 'WeChatSignWelcome',
        data() {
            return {
                logoBg: `${this.$vp.options.appUrl}/img/logo-ty.png`,
                welcomeBg: `${this.$vp.options.appUrl}/img/welcome_bg.jpg`,
                mainUrl: '/Error',
                meetingId: NaN,
                sessionId: NaN
            }
        },
        created() {
            // &meetingId=1&sessionId=1
            // import qs from 'qs'
            // const _urlParams = ((_temp) => {
            //     return _temp ? qs.parse(_temp.substring(1, _temp.length)) : null
            // })(window.location.search)
            // // http://localhost:8080/WeChatSignWelcome?VNK=903f9591&meetingId=1&sessionId=1
            // console.log('_urlParams', _urlParams)
            // if (_urlParams) {
            //     this.meetingId = _urlParams.meetingId
            //     this.sessionId = _urlParams.sessionId
            // } else {
            //     Notification.error({
            //         title: ERR_DIALOG_TITLE,
            //         message: '您没有正确进入本会场预设的链接，请联系相关技术人员给予解决。',
            //         duration: 5000
            //     })
            // }
            console.log('this.$route.params', this.$route.params)
            if (this.$route.params && this.$vp.utilObjHasVal(this.$route.params)) {
                this.meetingId = this.$route.params.meetingId
                this.sessionId = this.$route.params.sessionId
                this.mainUrl = `/WeChatSignTobacco/${this.meetingId}/${this.sessionId}`

                window.document.onkeydown = (event) => {
                    var e = event || window.event || arguments.callee.caller.arguments[0];
                    if (e && e.keyCode == 13) { // enter 键
                        //要做的事情
                        this.$vp.pageReplace(this.mainUrl)
                    }
                }
            } else {
                Notification.error({
                    title: ERR_DIALOG_TITLE,
                    message: '您没有正确进入本会场预设的链接，请联系相关技术人员给予解决。',
                    duration: 5000
                })
            }
        },
        mounted() {
            Notification.error({
                message: '请点击键盘的Enter，即可进入活动主界面，开启统计',
            })
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
        .box
            display: flex
            background-color: #7a0402
            align-items: center; /*垂直居中*/
            justify-content: center; /*水平居中*/
            height: 100%;
            .bg-box
                width 979px
                height 734px
                margin 0 auto
                background-size: cover
                .go-to-home-btn
                    font-size 26px
                    color #ffffff
</style>
