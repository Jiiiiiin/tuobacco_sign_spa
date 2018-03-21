import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import Navigation from 'vue-navigation'
import ViewPlus from 'vue-viewplus'
import VueLazyload from 'vue-lazyload'
import plugins from './store/plugins'
import {Loading} from 'element-ui';
import './assets/styl/index.styl'
import { Notification } from 'element-ui';

Vue.use(Vuex)

const store = new Vuex.Store({
    /*eslint-disable no-undef*/
    strict: process.env.NODE_ENV !== 'production',
    plugins
})

Vue.use(Navigation, {router, store})

Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: require('./assets/img/lazy_defult_img.png'),
    loading: require('./assets/img/lazy_defult_img.png'),
    attempt: 1
})

let loadingInstance = null
// const ip = '192.168.43.58'
// const BASE_URL = `http://${ip}:8080`
const BASE_URL = 'http://yun1.tuobacco.com'

Vue.use(ViewPlus, {
    router,
    store,
    errorHandler(err) {
        if(!(err instanceof Error) || !err)
            console.error(err)
        if (err) {
            const message = err.message
            if (message && !message.includes('onLoginStateCheckFaild')) {
                console.error(err, 'is Error')
            }
        }
    },
    env: 'BROWSER',
    debug: process.env.NODE_ENV !== 'production',
    appUrl: BASE_URL,
    utilDom: {
        enable: true,
    },
    utilHttp: {
        baseURL: `${BASE_URL}/weixin-meeting`,
        // withCredentials: true,
        timeout: '10000',
        headers: {
            Accept: 'application/json, text/plain, */*'
        },
        statusCodeKey: 'ReturnCode',
        statusCode: '000000',
        msgKey: 'ReturnMessage',
        defShowLoading: false,
        onReqErrPaserMsg: (response, errMsg) => {
            return `${errMsg} [服务端]`
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
        errDialog(message = '错误消息未定义') {
            Notification.warning({
                message
            })
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
