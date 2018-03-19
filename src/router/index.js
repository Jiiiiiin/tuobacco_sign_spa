import 'babel-polyfill'
import Router from 'vue-router'
import WeChatSignTobacco from '../components/WeChatSignTobacco'
import Vue from 'vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'WeChatSignTobacco',
      component: WeChatSignTobacco
    }
  ]
})
