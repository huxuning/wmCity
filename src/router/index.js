import Vue from 'vue'
import Router from 'vue-router'
import Login from 'pages/login/login'  // 好吃登录页
import Register from 'pages/register/register'  // 好吃注册页
import ForgetPassword from 'pages/forgetPassword/forget-password' // 忘记密码页
import EatHome from 'pages/eat-home/eat-home'  // 好吃首页
import EatStoreList from 'pages/eat-store-list/eat-store-list' // 商铺列表
import EatStoreDetail from 'pages/eat-store-detail/eat-store-detail'  // 商铺详情
import EatOrderComfirm from 'pages/eat-order-comfirm/eat-order-comfirm'  // 商铺详情
import ShippingAddress from 'pages/shipping-address/shipping-address' // 配送地址页
import PersonCenter from 'pages/person-center/person-center' // 个人中心
import Demo from 'pages/demo/demo'
import map from 'pages/map/map'
Vue.use(Router)

let router = new Router({
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
        title: '好吃首页',
        keepAlive: true,
        needFooter: true,
        footIndex: 2
      },
    },
    {
      path: '/EatStoreList',
      name: 'EatStoreList',
      component: EatStoreList,
      meta: {
        title: '商铺列表',
        keepAlive: true
      }
    },
    {
      path: '/EatStoreDetail',
      name: 'EatStoreDetail',
      component: EatStoreDetail,
      meta: {
        title: '店铺首页',
        keepAlive: true
      }
    },
    {
      path: '/EatOrderComfirm',
      name: 'EatOrderComfirm',
      component: EatOrderComfirm,
      meta: {
        needLogin: true,
        keepAlive: true,
        title: '订单支付'
      }
    },
    {
      path: '/ShippingAddress',
      name: 'ShippingAddress',
      component: ShippingAddress,
      meta: {
        needLogin: true,
        title: '配送地址'
      }
    },
    {
      path: '/PersonCenter',
      name: 'PersonCenter',
      component: PersonCenter,
      meta: {
        needLogin: true,
        title: '个人中心',
        needFooter: true,
        footIndex: 4
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        hasNav: false,
        title: '登录'
      },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        hasNav: false,
        title: '注册'
      }
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: ForgetPassword,
      meta: {
        hasNav: false,
        title: '忘记密码'
      }
    },
    {
      path: '/map',
      name: 'map',
      component: map,
      meta: {
        hasNav: false,
        title: '地图'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let userKey = window.localStorage.getItem('userKey')
  let createTime = window.localStorage.getItem('createTime')
  let createTimestamp = Date.parse(createTime)
  let currentTimestamp = Date.parse(new Date())
  let fifteenDayTimestamp = 15 * 24 * 60 * 60 * 1000
  let timeDiff = currentTimestamp - createTimestamp
  console.log(to.name)
  if(to.name == 'login' || to.name == 'register') {
    next()
    return
  }
  console.log(createTimestamp)
  if (to.meta.needLogin && !userKey) {
    if (!createTime || timeDiff > fifteenDayTimestamp) {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
