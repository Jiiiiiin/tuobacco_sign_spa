import 'babel-polyfill'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Vue from 'vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
