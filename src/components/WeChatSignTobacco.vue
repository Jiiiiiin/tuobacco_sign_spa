<template>
    <div class="wechat-sign-tobacco" ref="wechatSignDiv">
        <div class="item-logo">
            <img class="logo-img" src="../assets/img/logo-ty.png" alt="">
        </div>
        <div class="box">
            <div class="item-ye">
                <div class="ye">
                    <div class="ye-top-empty"></div>
                    <we-chat-sign-photo-item-box
                            v-for="item in photoData"
                            :key="item.id"
                            :item-data="item.list"
                            :margin-left="item.marginLeft"
                            :margin-top="item.marginTop">
                    </we-chat-sign-photo-item-box>
                </div>
            </div>
        </div>
        <div class="lottery-box">
            <div class="item-lottery-record">
                <img class="item-lottery-record-img-1" src="../assets/img/chouj-01.jpg" alt="">
                <img src="../assets/img/chouj-01.jpg" alt="">
                <img class="item-lottery-record-img-1" src="../assets/img/chouj-01.jpg" alt="">
                <img src="../assets/img/chouj-01.jpg" alt="">
                <img class="item-lottery-record-img-1" src="../assets/img/chouj-01.jpg" alt="">
                <img src="../assets/img/chouj-01.jpg" alt="">
                <img class="item-lottery-record-img-1" src="../assets/img/chouj-01.jpg" alt="">
                <img src="../assets/img/chouj-01.jpg" alt="">
                <img class="item-lottery-record-img-1" src="../assets/img/chouj-01.jpg" alt="">
                <img src="../assets/img/chouj-01.jpg" alt="">
            </div>
            <div class="item-lottery-btn">
                <img src="../assets/img/lottery-btn.png" alt="">
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import WeChatSignPhotoItem from './WeChatSignPhotoItem.vue'
    import WeChatSignPhotoItemBox from './WeChatSignPhotoItemBox.vue'

    export default {
        name: 'HelloWorld',
        components: {
            'we-chat-sign-photo-item-box': WeChatSignPhotoItemBox,
            'we-chat-sign-photo-item': WeChatSignPhotoItem
        },
        data() {
            return {
                // imgUrl: `${this.$vp.options.appUrl}/public/img/def_phto_item.png`
                // defPhotoImgUrl: `http://img5.imgtn.bdimg.com/it/u=1648644770,3129302077&fm=27&gp=0.jpg`
                defPhotoImgUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg',
                photoData: [
                    {
                        id: 1,
                        maxNumb: 8,
                        marginLeft: 206,
                        marginTop: 0,
                        list: [
                            {
                                headimgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg',
                                username: '张三',
                                id: 1
                            },
                            {
                                headimgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg',
                                username: '张三',
                                id: 2
                            }
                        ]
                    },
                    {
                        id: 2,
                        maxNumb: 10,
                        marginLeft: 228,
                        marginTop: 13,
                        list: [
                            {
                                headimgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg',
                                username: '张三',
                                id: 1
                            },
                            {
                                headimgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg',
                                username: '张三',
                                id: 2
                            }
                        ]
                    },
                    {
                        id: 3,
                        maxNumb: 10,
                        marginLeft: 248,
                        marginTop: 13,
                        list: [
                            {
                                headimgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg',
                                username: '张三',
                                id: 1
                            },
                            {
                                headimgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg',
                                username: '张三',
                                id: 2
                            }
                        ]
                    },
                    {
                        id: 4,
                        maxNumb: 11,
                        marginLeft: 269,
                        marginTop: 8,
                        list: [
                            {
                                headimgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg',
                                username: '张三',
                                id: 1
                            },
                            {
                                headimgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg',
                                username: '张三',
                                id: 2
                            }
                        ]
                    },
                    {
                        id: 5,
                        maxNumb: 12,
                        marginLeft: 288,
                        marginTop: 12,
                        list: [
                            {
                                headimgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg',
                                username: '张三',
                                id: 1
                            },
                            {
                                headimgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg',
                                username: '张三',
                                id: 2
                            }
                        ]
                    },
                    {
                        id: 6,
                        maxNumb: 12,
                        marginLeft: 318,
                        marginTop: 12,
                        list: [
                            {
                                headimgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg',
                                username: '张三',
                                id: 1
                            },
                            {
                                headimgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg',
                                username: '张三',
                                id: 2
                            }
                        ]
                    },
                    {
                        id: 7,
                        maxNumb: 11,
                        marginLeft: 368,
                        marginTop: 12,
                        list: [
                            {
                                headimgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg',
                                username: '张三',
                                id: 1
                            },
                            {
                                headimgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg',
                                username: '张三',
                                id: 2
                            }
                        ]
                    },
                    {
                        id: 8,
                        maxNumb: 11,
                        marginLeft: 396,
                        marginTop: 12,
                        list: [
                            {
                                headimgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg',
                                username: '张三',
                                id: 1
                            },
                            {
                                headimgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg',
                                username: '张三',
                                id: 2
                            }
                        ]
                    },
                    {
                        id: 9,
                        maxNumb: 11,
                        marginLeft: 282,
                        marginTop: 17,
                        list: [
                            {
                                headimgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg',
                                username: '张三',
                                id: 1
                            },
                            {
                                headimgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg',
                                username: '张三',
                                id: 2
                            },
                            {
                                headimgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg',
                                username: '张三',
                                id: 3
                            },
                            {
                                headimgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg',
                                username: '张三',
                                id: 4
                            },
                            {
                                headimgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg',
                                username: '张三',
                                id: 5
                            },
                            {
                                headimgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg',
                                username: '张三',
                                id: 6,
                                marginLeft: 138
                            },
                            {
                                headimgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg',
                                username: '张三',
                                id: 7
                            },
                            {
                                headimgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg',
                                username: '张三',
                                id: 8
                            }
                        ]
                    },
                    {
                        id: 10,
                        maxNumb: 9,
                        marginLeft: 250,
                        marginTop: 15,
                        list: [
                            {
                                headimgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg',
                                username: '张三',
                                id: 1
                            },
                            {
                                headimgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg',
                                username: '张三',
                                id: 2
                            },

                        ]
                    },
                    {
                        id: 11,
                        maxNumb: 11,
                        marginLeft: 211,
                        marginTop: 12,
                        list: [
                            {
                                headimgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg',
                                username: '张三',
                                id: 1
                            }
                        ]
                    },
                    {
                        id: 12,
                        maxNumb: 11,
                        marginLeft: 232,
                        marginTop: 9,
                        list: [
                            {
                                headimgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg',
                                username: '张三',
                                id: 1
                            },
                            {
                                headimgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg',
                                username: '张三',
                                id: 2
                            }
                        ]
                    },
                    {
                        id: 13,
                        maxNumb: 13,
                        marginLeft: 221,
                        marginTop: 12,
                        list: [
                            {
                                headimgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg',
                                username: '张三',
                                id: 1
                            },
                            {
                                headimgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg',
                                username: '张三',
                                id: 2
                            }
                        ]
                    }

                ],
            }
        },
        methods: {
            _initStyleOnPageLoad() {
                this.$nextTick(() => {
                    // const photoRow1Box = this.$refs.photoRow1Box
                    // console.log(photoRow1Box)
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
            }
        },
        mounted() {
            this._initStyleOnPageLoad()
            console.log(this.photoRow1BoxItemData)
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
                width 900px
        .lottery-box
            position absolute
            top:33%
            right 0
            width 20%
            display flex
            flex-direction column
            justify-content: flex-start
            .item-lottery-btn
                order 1
                margin-top: 20px
            .item-lottery-record
                order 0
                width 135px
                margin-left 10px
                .item-lottery-record-img-1
                    margin-right 5px
                img
                    width 60px
                    margin-bottom 5px

        /*.item-lottery*/
            /*align-items: flex-end*/
        .box
            display: flex
            background-color: #7a0402
            align-items: center; /*垂直居中*/
            justify-content: center; /*水平居中*/
            width: 85%;
            height: 100%;
            .box-item
                flex: 1;
            .item-ye
                background-color: #fff
                /*border 1px solid #fff*/
                .ye
                    width 979px
                    height 734px
                    margin 0 auto
                    background-image url(../assets/img/ye-bg.jpg);
                    .ye-top-empty
                        height 69px
                    .photo-row-2
                        margin-top 13px
                        margin-left 228px

</style>
