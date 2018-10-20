import Vue from 'vue'
import Router from 'vue-router'
import Login from 'pages/login/login'  // 好吃首页
import Register from 'pages/register/register'  // 好吃首页
import EatHome from 'pages/eat-home/eat-home'  // 好吃首页
import EatStoreList from 'pages/eat-store-list/eat-store-list' // 商铺列表
import EatStoreDetail from 'pages/eat-store-detail/eat-store-detail'  // 商铺详情
import EatOrderComfirm from 'pages/eat-order-comfirm/eat-order-comfirm'  // 商铺详情
import Demo from 'pages/demo/demo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/demo',
      name: 'demo',
      component: Demo,
      meta: {
        keepAlive: true,
        hasNav: true
      }
    },
    {
      path: '/',
      redirect: '/EatHome'
    },
    {
      path: '/EatHome',
      name: 'EatHome',
      component: EatHome,
      meta: {
        title: '好吃首页'
      },
      children: [
        {
          path: '/EatStoreList',
          name: 'EatStoreList',
          component: EatStoreList,
          meta: {
            title: '商铺列表'
          }
        },
        {
          path: '/EatStoreDetail',
          name: 'EatStoreDetail',
          component: EatStoreDetail,
          meta: {
            needLogin: true,
            title: '店铺首页'
          }
        },
        {
          path: '/EatOrderComfirm',
          name: 'EatOrderComfirm',
          component: EatOrderComfirm,
          meta: {
            needLogin: true,
            title: '订单支付'
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        hasNav: false,
        title: '登录'
      },
      children: [
        {
          path: '/register',
          name: 'register',
          component: Register,
          meta: {
            hasNav: false,
            title: '注册'
          }
        }
      ]
    }
  ]
})
