<template>
    <div class="wechat-sign-tobacco">
        <!--<div class="item-logo">-->
        <!--<img class="logo-img" v-lazy="logoBg" alt="云南中烟">-->
        <!--</div>-->
        <div class="box">
            <div class="item-ye">
                <div class="ye" v-lazy:background-image="yeBg">
                    <div class="ye-top-empty"></div>
                    <we-chat-sign-photo-item-box
                            v-for="item in photoData"
                            :key="item.id"
                            :item-data="item.list"
                            :margin-left="item.marginLeft"
                            :margin-top="item.marginTop"
                            class="participantRecord"
                            :id="item.id+'hack,'+(item.maxNumb === item.list.length ? 1 : 0)">
                        <!--1标识已经加载完毕， 0标识还可以填充-->
                    </we-chat-sign-photo-item-box>
                </div>
            </div>
        </div>
        <div class="lottery-box">
            <div class="item-lottery-record">
                <div class="lottery-record-img-box" v-for="item in itemLotteryRecord" :key="item.id">
                    <img class="item-lottery-record-img" v-lazy="item.hashData ? item.headimgurl: item.url"
                         :data-id="item.id">
                </div>
            </div>
            <div class="item-lottery-btn">
                <img v-lazy="lotteryBtn" alt="点击抽奖" @click="onLotteryBtnTap">
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import WeChatSignPhotoItem from './WeChatSignPhotoItem.vue'
    import WeChatSignPhotoItemBox from './WeChatSignPhotoItemBox.vue'
    import {Message} from 'element-ui';

    // 1标识已经加载完毕， 0标识还可以填充
    const ISFULL = 1

    export default {
        name: 'HelloWorld',
        components: {
            'we-chat-sign-photo-item-box': WeChatSignPhotoItemBox,
            'we-chat-sign-photo-item': WeChatSignPhotoItem
        },
        data() {
            return {
                /**
                 * 中奖纪录查询
                 * @param meetingId
                 * @param sessionId
                 */
                REQ_meetingDrawQuery: '',
                /**
                 * transcode: 查询参会人员列表
                 * 查询参会人员列表
                 * @param currentIndex 默认为0则查询全量数据，只需要跟踪与会记录列表返回的最后一个用户的id即可
                 * @param meetingId
                 * @param sessionId
                 */
                REQ_participantQuery: '',
                // 最后一个查询记录的用户的id
                REQ_participantQuery_currentIndex: 0,
                /**
                 * transcode: 抽奖
                 * 支持重复抽奖，将原有抽奖纪录置为无效后重新抽奖
                 * @param meetingId
                 * @param sessionId
                 * @param drawNum 需要抽取的总中奖人数
                 */
                REQ_meetingDraw: '',
                itemLotteryRecord: [],
                lotteryBtn: `${this.$vp.options.appUrl}/img/lottery-btn.png`,
                yeBg: `${this.$vp.options.appUrl}/img/ye-bg.jpg`,
                logoBg: `${this.$vp.options.appUrl}/img/logo-ty.png`,
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
                        list: []
                    },
                    {
                        id: 3,
                        maxNumb: 10,
                        marginLeft: 248,
                        marginTop: 13,
                        list: []
                    },
                    {
                        id: 4,
                        maxNumb: 11,
                        marginLeft: 269,
                        marginTop: 8,
                        list: []
                    },
                    {
                        id: 5,
                        maxNumb: 12,
                        marginLeft: 288,
                        marginTop: 12,
                        list: []
                    },
                    {
                        id: 6,
                        maxNumb: 12,
                        marginLeft: 318,
                        marginTop: 12,
                        list: []
                    },
                    {
                        id: 7,
                        maxNumb: 11,
                        marginLeft: 368,
                        marginTop: 12,
                        list: []
                    },
                    {
                        id: 8,
                        maxNumb: 11,
                        marginLeft: 396,
                        marginTop: 12,
                        list: []
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
                        list: []
                    },
                    {
                        id: 11,
                        maxNumb: 11,
                        marginLeft: 211,
                        marginTop: 12,
                        list: []
                    },
                    {
                        id: 12,
                        maxNumb: 11,
                        marginLeft: 232,
                        marginTop: 9,
                        list: []
                    },
                    {
                        id: 13,
                        maxNumb: 13,
                        marginLeft: 221,
                        marginTop: 12,
                        list: []
                    }

                ],
            }
        },
        methods: {
            // 抽奖
            onLotteryBtnTap() {
                this.$vp.ajaxGet(this.REQ_meetingDraw, {
                    params: {drawNum: 1}
                }).then(weInfo => {
                    // 这个是如果后台返回的是全量记录，同样可以达到目的
                    // this._paseWinningRecordData(res)
                    // 下面的是老接口 同步返回一个中奖用户的情况
                    const len = this.itemLotteryRecord.length
                    for (let i = 0; i < len; i++) {
                        let oldItem = this.itemLotteryRecord[i]
                        if (oldItem.hashData) {
                            continue
                        }
                        oldItem.hashData = true
                        this.itemLotteryRecord[i] = {...oldItem, ...weInfo}
                    }
                })
            },
            // 处理中奖纪录
            _paseWinningRecordData(res) {
                const data = res.List
                const len = data.length
                for (let i = 0; i < len; i++) {
                    let oldItem = this.itemLotteryRecord[i]
                    oldItem.hashData = true
                    let weInfo = data[i]
                    this.itemLotteryRecord[i] = {...oldItem, ...weInfo}
                }
            },
            _initItemLotteryRecordArr() {
                for (let i = 1; i < 11; i++) {
                    this.itemLotteryRecord.push({
                        url: `${this.$vp.options.appUrl}/img/chouj-${i}.jpg`,
                        hashData: false
                    })
                }
            },
            /**
             * 从数组中弹出传递数量的item，并返回弹出的item组成的新数组
             * @param arr
             * @param popNumb 需要补充的数量
             * @private
             */
            _popData2ArryByNumb(arr, popNumb, originArr) {
                // 直接返回在插入，vue不会把新插入的数据作为响应式数据
                // 后台返回的数据是，最先参加的人排在数组的最后
                return arr.splice(0, popNumb)
            },
            /**
             * 处理查询回来的参会记录
             * @param res
             * @param isNoAni 是否不需要动画处理，一般初始化页面的时候穿true，轮询的时候穿false，并实现下面的回调
             * @aniHandlerFun 如果需要进行动画处理，会回调该函数，由调用方自己去处理这块逻辑
             * @private
             */
            _paseParticipantRecords(res, isNoAni, aniHandlerFun) {
                // 更新 this.REQ_participantQuery_currentIndex 最后一个记录的idx
                // this.REQ_participantQuery_currentIndex
                if (!res) {
                    Message.warning({
                        message: '现在还木有人签到哦，不然我们的服务器怎么会不返回数据呢？'
                    });
                    return
                }
                // 1.先判断哪一行空着
                const listData = res.List
                if (listData && listData.length <= 0) {
                    console.warn('没有参会记录数据需要处理')
                    return
                }
                console.error('获取到的签到记录', listData)
                let participantRecord = document.getElementsByClassName('participantRecord')
                const len = participantRecord.length
                for (let i = 0; i < len; i++) {
                    let rowRecordDiv = participantRecord[i]
                    const harkVal = rowRecordDiv.getAttribute('id')
                    rowRecordDiv = null
                    // 格式：1hack,0 rowRecordDiv -》 [itemid]xxx,0(1标识已经加载完毕， 0标识还可以填充)
                    const isFull = harkVal.split(',')[1] === ISFULL
                    if (isFull) {
                        // 当前这一行已经填满，那么就调到下一行，进行检查
                        continue
                    } else {
                        // 2.找到idx对应的记录
                        const pushRow = this.photoData[i]
                        const pushRowList = pushRow.list
                        const pushRowLen = pushRowList.length
                        const pushRowMaxNumb = pushRow.maxNumb
                        const emptyNumb = pushRowMaxNumb - pushRowLen
                        if (isNoAni) {
                            // vue 数据侦测https://cn.vuejs.org/v2/guide/list.html#%E6%95%B0%E7%BB%84%E6%9B%B4%E6%96%B0%E6%A3%80%E6%B5%8B
                            const popArrData = this._popData2ArryByNumb(listData, emptyNumb, pushRowList)
                            this.photoData[i].list = [...pushRowList, ...popArrData]
                        }
                        continue
                    }

                }
                // 释放dom引用
                participantRecord = null
            },
            // 查询所有参会记录
            _loadParticipantRecords() {
                this.$vp.ajaxGet(this.REQ_participantQuery, {
                    params: {
                        currentIndex: this.REQ_participantQuery_currentIndex
                    }
                }).then(res => {
                    this._paseParticipantRecords(res, true)
                    // 放在这里防止两个方法同时处理一个响应数据导致问题（未测试）
                    this._pollingParticipantRecords()
                }).catch(err => {
                    console.error('_loadParticipantRecords', err)
                    // 无论初始化获取记录是否成功都开启轮询监控
                    this._pollingParticipantRecords()
                })
            },
            _pollingParticipantRecords() {
                setTimeout(() => {
                    console.log('准备轮询')
                    // this.$vp.ajaxGet(this.REQ_participantQuery, {
                    //     params: {
                    //         currentIndex: this.REQ_participantQuery_currentIndex
                    //     }
                    // }).then(res => {
                    //     this._paseParticipantRecords(res, false, () => {
                    //         // 这里处理动画逻辑
                    //     })
                    // }).catch(err => {
                    //     console.error('轮询参会记录出错', err)
                    // })
                }, 10000)
            },
            // 加载微信与会人员数据，在页面初始化的时候执行
            _loadWeChartDataOnPageCreated() {
                this._loadParticipantRecords()
            },
            // 加载中奖数据, 中奖纪录查询
            _loadLotteryRecordData() {
                this.$vp.ajaxMixin(this.REQ_meetingDrawQuery).then(res => {
                    this._paseWinningRecordData(res)
                })
            }
        },
        created() {
            this.meetingId = this.$route.params.meetingId
            this.sessionId = this.$route.params.sessionId
            this.REQ_meetingDrawQuery = `weixin-meeting/${this.meetingId}/${this.sessionId}/meetingDrawQuery`
            this.REQ_participantQuery = `weixin-meeting/${this.meetingId}/${this.sessionId}/participantQuery`
            this.REQ_meetingDraw = `weixin-meeting/${this.meetingId}/${this.sessionId}/meetingDraw`
            this._initItemLotteryRecordArr()
            this._loadWeChartDataOnPageCreated()
            this._loadLotteryRecordData()
        },
        mounted() {
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
            top: 33%
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
                .lottery-record-img-box
                    width 60px
                    float left
                    margin-right 5px
                    .item-lottery-record-img
                        width 60px
                        margin-bottom 5px
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
                .ye
                    width 979px
                    height 734px
                    margin 0 auto
                    .ye-top-empty
                        height 69px
                    .photo-row-2
                        margin-top 13px
                        margin-left 228px

</style>
