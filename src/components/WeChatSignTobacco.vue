<template>
    <div class="wechat-sign-tobacco">
        <div class="item-logo">
            <img class="logo-img" v-lazy="logoBg" alt="云南中烟">
        </div>
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
                            :id="item.id+SPLIT_FLAG+(item.maxNumb === item.list.length ? 1 : 0)">
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
        <p v-show="countSignRecords === 0" class="show-recods" style="color: #fff">等待与会嘉宾到场</p>
        <!--@click="onTapQryRecods"-->
        <el-badge :value="countSignRecords" class="show-recods" v-show="countSignRecords > 0">
            <el-button size="small">与会人数</el-button>
        </el-badge>
    </div>
</template>

<script type="text/ecmascript-6">
    import WeChatSignPhotoItem from './WeChatSignPhotoItem.vue'
    import WeChatSignPhotoItemBox from './WeChatSignPhotoItemBox.vue'
    import {Message, Notification, Badge, Button} from 'element-ui'
    import Vue from 'vue'
    import Zoomerang from 'zoomerang'

    Vue.component(Badge.name, Badge)
    Vue.component(Button.name, Button)

    // 1标识已经加载完毕， 0标识还可以填充
    // string类型是因为，从dom获取到的就是这个类型
    const ISFULL = '1'
    const ERR_DIALOG_TITLE = '开小差了'

    export default {
        name: 'HelloWorld',
        components: {
            'we-chat-sign-photo-item-box': WeChatSignPhotoItemBox,
            'we-chat-sign-photo-item': WeChatSignPhotoItem
        },
        data() {
            return {
                // 与会总记录数
                countSignRecords: 0,
                SPLIT_FLAG: '-',
                // 轮询setInterval返回对象，用于在【消化数据的时候】暂停
                POLLING_QRY_INTERVAL: null,
                // 轮询的间隔时间，可能会动态控制，以便提高性能，也就是在连续得到数据的时候【加快】，反之放慢
                POLLING_QRY_INTERVAL_TIME: 5000,
                // 用于统计轮询的次数
                POLLING_QRY_NUMBS: 0,
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
                yeBg: `${this.$vp.options.appUrl}/img/ye-bg.png`,
                logoBg: `${this.$vp.options.appUrl}/img/logo-ty.png`,
                photoData: [
                    {
                        id: 1,
                        maxNumb: 8,
                        marginLeft: 206,
                        marginTop: 0,
                        list: []
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
                    // 第9行需要特殊处理，第[5]位的item需要设置【marginLeft: 138】
                    {
                        id: 9,
                        maxNumb: 12,
                        marginLeft: 282,
                        marginTop: 17,
                        list: []
                    },
                    // 第10行需要特殊处理，第[9]位的item需要设置【marginLeft: xxx】
                    {
                        id: 10,
                        maxNumb: 16,
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
                        maxNumb: 13,
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
                ]
            }
        },
        methods: {
            // 抽奖
            onLotteryBtnTap() {
                this.$vp.ajaxGet(this.REQ_meetingDraw, {
                    params: {drawNum: 1}
                }).then(res => {
                    // 这个是如果后台返回的是全量记录，同样可以达到目的
                    // this._parseWinningRecordData(res)
                    // 下面的是老接口 同步返回一个中奖用户的情况
                    if (res && res.List && res.List.length === 1) {
                        const weInfo = res.List[0]
                        const len = this.itemLotteryRecord.length
                        for (let i = 0; i < len; i++) {
                            let oldItem = this.itemLotteryRecord[i]
                            if (oldItem.hashData) {
                                continue
                            }
                            oldItem.hashData = true
                            this.itemLotteryRecord[i] = {...oldItem, ...weInfo}
                            // 服务端只会返回一条记录
                            break
                        }
                    } else {
                        Notification.error({
                            title: ERR_DIALOG_TITLE,
                            message: '服务端没有返回正确的中奖纪录'
                        })
                    }
                })
            },
            /**
             * 点击查询记录
             */
            onTapQryRecods() {
                // TODO 调到下一个页面查询
            },
            // 处理中奖纪录
            _parseWinningRecordData(res) {
                const data = res.List
                const len = data.length
                for (let i = 0; i < len; i++) {
                    let oldItem = this.itemLotteryRecord[i]
                    oldItem.hashData = true
                    let weInfo = data[i]
                    const mergeWeInfoData = {...oldItem, ...weInfo}
                    this.$set(this.itemLotteryRecord, i, mergeWeInfoData)
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
            _popData2ArrayByNumb(arr, popNumb) {
                // 直接返回在插入，vue不会把新插入的数据作为响应式数据
                // 后台返回的数据是，最先参加的人排在数组的最后
                return arr.splice(0, popNumb)
            },
            _handler89RowMargin(popArrData, idx) {
                if (idx === 8) {
                    let item = popArrData[4]
                    popArrData[4] = {...item, ...{marginLeft: 158}}
                } else if (idx === 9) {
                    let item = popArrData[10]
                    popArrData[10] = {...item, ...{marginLeft: 68}}
                }

            },
            /**
             * 处理查询回来的参会记录
             * @param res
             * @private
             */
            _parseParticipantRecords(res, finishCallBack) {
                if (!res || !res.List) {
                    Notification.error({
                        title: ERR_DIALOG_TITLE,
                        message: '服务端没有返回正确的与会纪录'
                    })
                    return
                }
                // 1.先判断哪一行空着
                const listData = res.List
                const listDataLen = listData.length
                this.countSignRecords += listDataLen
                if (listData && listDataLen <= 0) {
                    console.warn('没有参会记录数据需要处理')
                    return
                }
                // 更新 this.REQ_participantQuery_currentIndex 最后一个记录的idx
                this.REQ_participantQuery_currentIndex = listData[listDataLen - 1].id
                const participantRecord = document.getElementsByClassName('participantRecord')
                const len = participantRecord.length
                let IS_PUSH_FULL_YE = false
                for (let i = 0; i < len; i++) {
                    let rowRecordDiv = participantRecord[i]
                    const rowRecordDivId = rowRecordDiv.getAttribute('id')
                    const harkArr = rowRecordDivId.split(this.SPLIT_FLAG)
                    // 格式：1H0 rowRecordDiv -》 [itemid]H0(1标识已经加载完毕， 0标识还可以填充)
                    const flag = harkArr[1]
                    const isFull = (flag === ISFULL)
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
                        // vue 数据侦测https://cn.vuejs.org/v2/guide/list.html#%E6%95%B0%E7%BB%84%E6%9B%B4%E6%96%B0%E6%A3%80%E6%B5%8B
                        const popArrData = this._popData2ArrayByNumb(listData, emptyNumb, pushRowList)
                        if (i === 8 || i === 9) {
                            this._handler89RowMargin(popArrData, i)
                        }
                        if (i === 12) {
                            // 第13行，共有13个座位
                            if ((pushRowMaxNumb - popArrData.length) === 0) {
                                IS_PUSH_FULL_YE = true
                                console.log('两片叶子预设的位子已经被全部填满')
                            }
                        }
                        this.photoData[i].list = [...pushRowList, ...popArrData]
                        const newRowList = this.photoData[i].list
                        const updatedLen = newRowList.length
                        // 更新dom上面使用id绑定的【标识】，标识填充完毕
                        // :id="item.id+'hack,'+(item.maxNumb === item.list.length ? 1 : 0)"
                        rowRecordDiv.setAttribute('id', `${harkArr[0]}${this.SPLIT_FLAG}${pushRowMaxNumb === updatedLen ? 1 : 0}`)
                        rowRecordDiv = null
                        // 查询回来的结果pop完毕之后，就退出循环
                        if (listData.length == 0) {
                            break
                        }
                    }
                }
                finishCallBack(IS_PUSH_FULL_YE)
            },
            // 查询所有参会记录
            _loadParticipantRecords() {
                this.$vp.ajaxGet(this.REQ_participantQuery, {
                    params: {
                        currentIndex: this.REQ_participantQuery_currentIndex
                    }
                }).then(res => {
                    this._parseParticipantRecords(res, (isPushFull) => {
                        if (!isPushFull) {
                            console.log('初次加载处理完毕，没有填满，回调开启轮询')
                            setTimeout(() => {
                                // 放在这里防止两个方法同时处理一个响应数据导致问题（未测试）
                                this._pollingParticipantRecords()
                            }, 1000)
                        }
                    })
                }).catch(() => {
                    setTimeout(() => {
                        console.log('初次加载处理完毕，回调开启轮询')
                        // 无论初始化获取记录是否成功都开启轮询监控
                        this._pollingParticipantRecords()
                    }, 1000)
                })
            },
            /**
             * 返回还在空着的 row div infos
             * 如果返回null 标明，两片叶子已经填满
             */
            _getNoFullRowDiv() {
                const participantRecord = document.getElementsByClassName('participantRecord')
                const len = participantRecord.length
                for (let i = 0; i < len; i++) {
                    let rowRecordDiv = participantRecord[i]
                    const rowRecordDivId = rowRecordDiv.getAttribute('id')
                    const harkArr = rowRecordDivId.split(this.SPLIT_FLAG)
                    // 格式：1H0 rowRecordDiv -》 [itemid]H0(1标识已经加载完毕， 0标识还可以填充)
                    const flag = harkArr[1]
                    const isFull = (flag === ISFULL)
                    if (isFull) {
                        // 当前这一行已经填满，那么就调到下一行，进行检查
                        continue
                    } else {
                        return {
                            rowRecordDiv,
                            harkArr,
                        }
                    }
                }
                // 标示 处理完毕，全部填满
                return null
            },
            _parsePollingParticipantRecords(amiItem, amiFinishListener) {
                // 延迟执行以便先看到头像被放入叶子
                setTimeout(() => {
                    let msgInstance = null
                    // 这里处理动画逻辑
                    Zoomerang.config({
                        bgColor: '#000',
                        bgOpacity: 0.5,
                        deepCopy: true,
                        onClose(closeItemDom) {
                            closeItemDom.style.transform = ''
                            // const closeItemDomTitle = closeItemDom.childNodes[1]
                            // closeItemDomTitle.style.display = 'none'
                            const closeItemDomImg = closeItemDom.childNodes[0]
                            closeItemDomImg.style.backgroundColor = '#dbb756'
                            closeItemDomImg.style.border = '1px solid #7a0402'

                        },
                        onOpen(closeItemDom) {
                            const closeItemDomImg = closeItemDom.childNodes[0]
                            const closeItemDomTitle = closeItemDomImg.getAttribute('alt')
                            msgInstance = Message.success({
                                message: `欢迎 ${closeItemDomTitle} 参加本次会议`,
                                center: true,
                                duration: 0
                            })
                            document.getElementsByClassName('el-message').item(0).style.zIndex = '100000'
                        }
                    })
                    // 找到row对应的动态添加的一个dom
                    // https://yyx990803.github.io/zoomerang/
                    Zoomerang.listen(amiItem)
                    amiItem.click()
                    // 设置自动关闭
                    setTimeout(() => {
                        amiItem.click()
                        msgInstance.close()
                        amiFinishListener()
                        // 当前这个延迟不能小于外层的延迟
                    }, 3000)
                }, 1500)
            },
            _pollingParticipantRecordsParser(listData, dataHandlerFinish, rowPushFull) {
                if (listData.length === 0) {
                    // 递归结束
                    // TODO 准备开启轮询
                    dataHandlerFinish()
                    return
                }
                let userData = listData.shift()
                // console.log('本次需要处理的客户记录', userData)
                // 更新 this.REQ_participantQuery_currentIndex 最后一个记录的idx
                this.REQ_participantQuery_currentIndex = userData.id
                // console.log('轮询更新REQ_participantQuery_currentIndex', this.REQ_participantQuery_currentIndex)
                // 先更新响应数据，拿到最新的一个img dom
                let rowRecord = this._getNoFullRowDiv()
                if (rowRecord === null) {
                    // 已经填满
                    // TODO 结束所有轮询
                    console.log('叶子装满咯')
                    rowPushFull()
                    return
                }
                const rowRecordDiv = rowRecord.rowRecordDiv
                let harkArr = rowRecord.harkArr
                // row的numb是从1计数，这里需要从0
                const rowNumb = harkArr[0] - 1

                const len = rowRecordDiv.childNodes.length
                if (rowNumb === 8) {
                    // 找到列
                    if (len === 6) {
                        userData = {...userData, ...{marginLeft: 158}}
                    }
                } else if (rowNumb === 9) {
                    if (len === 12) {
                        userData = {...userData, ...{marginLeft: 68}}
                    }
                }
                const pushRow = this.photoData[rowNumb]
                const pushRowList = pushRow.list
                pushRowList.push(userData)
                const pushRowLen = pushRowList.length
                const pushRowMaxNumb = pushRow.maxNumb
                const emptyNumb = pushRowMaxNumb - pushRowLen

                // 上面是响应式更新数据，需要等dom填充
                this.$nextTick(() => {
                    const imagesBox = rowRecordDiv.childNodes
                    const len = imagesBox.length
                    const closeItemDom = imagesBox[len - 1]
                    const closeItemDomImg = closeItemDom.childNodes[0]
                    closeItemDomImg.style.backgroundColor = 'transparent'
                    closeItemDomImg.style.border = 'none'
                    setTimeout(() => {
                        this.countSignRecords += 1
                    }, 1000)
                    this._parsePollingParticipantRecords(closeItemDom, () => {
                        if (emptyNumb === 0) {
                            console.log('填满了一行', harkArr)
                            rowRecordDiv.setAttribute('id', `${harkArr[0]}${this.SPLIT_FLAG}1`)
                            // 一行处理完毕，换一行处理
                            // 防止setAttribute id 还没有映射到dom，所以起一个setTimeout
                            this.$nextTick(() => {
                                this._pollingParticipantRecordsParser(listData, dataHandlerFinish)
                            })
                            // 类似递归的一次continue
                            return
                        } else {
                            // 递归调用，知道本次拿到的后台更新记录处理完毕
                            this._pollingParticipantRecordsParser(listData, dataHandlerFinish)
                        }
                    })
                })
            },
            _pollingParticipantRecords() {
                this.POLLING_QRY_INTERVAL = setInterval(() => {
                    this.POLLING_QRY_NUMBS += 1
                    console.log(`轮询了第${this.POLLING_QRY_NUMBS}次`)
                    this.$vp.ajaxGet(this.REQ_participantQuery, {
                        params: {
                            currentIndex: this.REQ_participantQuery_currentIndex
                        }
                    }).then(res => {
                        if (!res || !res.List) {
                            Notification.error({
                                title: ERR_DIALOG_TITLE,
                                message: '服务端没有返回正确的与会纪录'
                            })
                            return
                        }
                        // 1.先判断哪一行空着
                        const listData = res.List
                        if (listData && listData.length <= 0) {
                            console.warn('没有参会记录数据需要处理')
                            return
                        }
                        window.clearInterval(this.POLLING_QRY_INTERVAL)
                        console.log('将数据丢下去消化，暂停轮询', listData.length)
                        this._pollingParticipantRecordsParser(listData, () => {
                            console.log('数据消化完毕，回调，开始新的轮询')
                            this._pollingParticipantRecords()
                        }, () => {
                            console.log('叶子填满回调')
                        })
                    })
                }, this.POLLING_QRY_INTERVAL_TIME)
            },
            // 加载微信与会人员数据，在页面初始化的时候执行
            _loadWeChartDataOnPageCreated() {
                this._loadParticipantRecords()
                // ！测试轮询才能放开
                // this._pollingParticipantRecords()
            },
            // 加载中奖数据, 中奖纪录查询
            _loadLotteryRecordData() {
                this.$vp.ajaxMixin(this.REQ_meetingDrawQuery).then(res => {
                    this._parseWinningRecordData(res)
                })
            }
        },
        created() {
            this.meetingId = this.$route.params.meetingId
            this.sessionId = this.$route.params.sessionId
            this.REQ_meetingDrawQuery = `${this.meetingId}/${this.sessionId}/meetingDrawQuery`
            this.REQ_participantQuery = `${this.meetingId}/${this.sessionId}/participantQuery`
            this.REQ_meetingDraw = `${this.meetingId}/${this.sessionId}/meetingDraw`
            this._initItemLotteryRecordArr()
            this._loadLotteryRecordData()
            this._loadWeChartDataOnPageCreated()
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
        .show-recods
            position absolute
            bottom: 5%;
            left: 3%;
        .item-logo
            position: absolute;
            top: 0;
            right: 0;
            .logo-img
                width 600px
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
                        width 54px
                        border: 1px solid #7a0402;
                        padding: 2px;
                        border-radius: 5px;
                        background-color: #dbb756;
                        margin-bottom 5px
                        box-shadow: -1px 1px 2px 1px #7f2b29;
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
                    background-repeat: no-repeat;
                    background-size: cover
                    .ye-top-empty
                        height 69px
                    .photo-row-2
                        margin-top 13px
                        margin-left 228px

</style>
