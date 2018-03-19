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
export const BASE_URL = 'http://192.168.3.43:8080'

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
    utilCache: {
        enable: true,
    },
    utilHttp: {
        baseURL: BASE_URL,
        // withCredentials: true,
        timeout: '3000',
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
