import 'babel-polyfill'
import Router from 'vue-router'
import Vue from 'vue'
import GlobalErr from '../components/GlobalErr.vue'
import WeChatSignTobacco from '../components/WeChatSignTobacco.vue'
import WeChatSignWelcome from '../components/WeChatSignWelcome.vue'

Vue.use(Router)

export default new Router({
    // 动态参数失效
    // mode: 'history',
    scrollBehavior() {
        return {x: 0, y: 0}
    },
    routes: [
        {
            path: '/',
            // redirect: { name: 'WeChatSignTobacco'}
            // redirect: {name: 'WeChatSignWelcome'}
            redirect: '/WeChatSignWelcome'
        },
        {
            path: '/WeChatSignWelcome/:meetingId/:sessionId',
            name: 'WeChatSignWelcome',
            component: WeChatSignWelcome,
            meta: {
                title: '中烟活动-欢迎页面'
            }
        },
        {
            path: '/WeChatSignTobacco/:meetingId/:sessionId',
            name: 'WeChatSignTobacco',
            component: WeChatSignTobacco,
            meta: {
                title: '中烟活动-活动主页'
            }
        },
        {
            path: '/Error',
            name: 'Error',
            component: GlobalErr,
            meta: {
                title: '找不到待访问的资源',
                subRoot: true
            }
        },
        {
            path: '*',
            name: 'GlobalErr',
            component: GlobalErr,
            meta: {
                title: '找不到待访问的资源',
                subRoot: true
            }
        }
    ]
})
