import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import Navigation from 'vue-navigation'
import ViewPlus from 'vue-viewplus'
import plugins from './store/plugins'
import {Loading} from 'element-ui';
import './assets/styl/index.styl'

Vue.use(Vuex)

const store = new Vuex.Store({
    /*eslint-disable no-undef*/
    strict: process.env.NODE_ENV !== 'production',
    plugins
})

Vue.use(Navigation, {router, store})

let loadingInstance = null

Vue.use(ViewPlus, {
    router,
    store,
    errorHandler(err) {
        if(!(err instanceof Error))
            console.error(err)
        if (err) {
            const message = err.message
            if (message && !message.includes('onLoginStateCheckFaild')) {
                console.error(err, 'is Error')
            }
        } else {
            this.uiDialog('err参数错误', {title: '捕获到全局错误'})
        }
    },
    env: 'BROWSER',
    debug: process.env.NODE_ENV !== 'production',
    appUrl: 'http://localhost:8080',
    utilCache: {
        enable: true,
    },
    utilHttp: {
        baseURL: 'http://localhost:3000',
        // withCredentials: true,
        timeout: '3000',
        headers: {
            Accept: 'application/json, text/plain, */*'
        },
        params: {
            BankId: '9999',
            LoginType: 'K',
            _locale: 'zh_CN'
        },
        dataKey: 'ResData',
        statusCodeKey: 'ReturnCode',
        statusCode: '000000',
        msgKey: 'ReturnMessage',
        needBase64DecodeMsg: false,
        defShowLoading: true,
        onPageTo: null,
        onPageReplace: null,
        onPageNext: null,
        onPageGoBack: null,
        onPageHref: null,
        onSendAjaxRespErr: (response) => {
            console.log(`example on onSendAjaxRespErr called ${response}`)
            return false
        },
        onReqErrPaserMsg: (response, errMsg) => {
            console.log(`example on onReqErrPaserMsg called: ${response} ${errMsg}`)
            // 返回空标识不处理错误消息解析
            return `onReqErrPaserMsg回调应用处理返回：${errMsg}`
        },
        loading(_showLoading) {
            if (_showLoading) {
                loadingInstance = Loading.service()
            }
        },
        hideLoading() {
            if (loadingInstance) {
                setTimeout(() => {
                    loadingInstance.close()
                }, 0)
            }
        },
        errDialog(content = '错误消息未定义') {
            alert(content)
            return this
        }
    }
})

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
    mounted() {
        console.log(this.$vp.options.appUrl)
    }
}).$mount('#app')
