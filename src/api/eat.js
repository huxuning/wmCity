
import axios from 'common/js/axios'

//获取首页餐饮一级分类
export function baseCategoryList (params = {}) {
  let data = {
    ...params
  }
  return axios({
    url: '/catering/category/queryBaseCategoryList',
    method: 'get',
    data: data
  })
}

//获取首页活动推荐
export function cateringRecommendList (params = {}) {
  let data = {
    ...params
  }
  return axios({
    url: '/catering/recommend/queryCateringRecommendList/'+params.cityName,
    method: 'get'
  })
}

// 获取首页餐饮子分类  (弃)
export function querySubCategoryList (params = {}) {
  let data ={
    ...params
  }
  return axios({
    url: '/catering/category/querySubCategoryList/' + (params.id ? params.id : 0),
    method: 'get',
    data: data
  })
}
//获取首页餐饮子分类
export function labelList (params = {}) {
  return axios({
    url: '/catering/restaurant/labelList',
    method: 'get'
  })
}
//获取首页推荐商户列表
export function baseRestaurantList (params = {}) {
  let data = {
    cityName: "", 
    longitude: null, 
    latitude: null, 
    locationFlag: "N",
    ...params
  }
  return axios({
    url: '/catering/restaurant/queryRecommendRestaurantList/' + (params.pageNum ? params.pageNum : 1),
    method: 'post',
    data: data
  })
}

//获取商户列表
export function restaurantList (params = {}) {
  let data = {
    ...params
  }
  return axios({
    url: '/catering/restaurant/queryCateringRestaurantList/'+(params.pageNum ? params.pageNum : 1),
    method: 'post',
    data: data
  })
}

//获取商户信息
export function restaurantInfo (params) {
  return axios({
    url: '/catering/restaurant/readCateringRestaurant/'+params.id,
    method: 'get'
  })
}

//获取商品分类信息
export function goodsCategoryList (params) {
  return axios({
    url: '/catering/goodsCategory/queryGoodsCategoryList/'+params.id,
    method: 'get'
  })
}

//获取商品分类信息
export function goodsList (params) {
  return axios({
    url: '/catering/goods/queryGoodsList/'+params.goodsCategoryId+'/'+params.status+'/'+params.pageNum,
    method: 'get'
  })
}

//店铺配送地址
export function restaurantLocation (params) {
  return axios({
    url: '/catering/location/queryRestaurantLocationList/'+params.id,
    method: 'get'
  })
}

// 新增收货人信息
export function insertCateringContacts (params = {}) {
  let data = {
    userKey: '',
    name: '',
    phone: '',
    cityCode: '',
    cityName: '',
    districtCode: '',
    districtName: '',
    address: '',
    longitude: '',
    latitude: '',
    defaultFlag: '',
    label: '',
    ...params
  }
  return axios({
    url: '/catering/contacts/insertCateringContacts/',
    method: 'post',
    data: data
  })
}

// 查询用户收货人列表
export function searchHistoryContacts (params) {
  return axios({
    url: '/catering/contacts/queryCateringContactsList/' + params.userKey + '/' + params.pageNum,
    method: 'get'
  })
}
// 读取用户默认收货人信息
export function queryDefaultCateringContacts () {
  return axios({
    url: '/catering/contacts/queryDefaultCateringContacts/' + window.localStorage.getItem('userKey'),
    method: 'get'
  })
}
//店铺活动获取
export function queryDiscountList (params) {
  return axios({
    url: '/catering/discount/queryDiscountList/'+ params.id,
    method: 'get'
  })
}

// 手机号码+密码登录
export function doLogin (params) {
  let data = {
    ...params
  }
  return axios({
    url: '/user/doLogin',
    method: 'post',
    data: data
  })
}

// 获取短信验证码
export function smsCode (params) {
  let data = {
    ...params
  }
  return axios({
    url: '/user/smsCode',
    data: data,
    method: 'get'
  })
}

// 手机号用户注册
export function phoneRegister (params) {
  let data = {
    ...params
  }
  return axios({
    url: '/user/register',
    method: 'post',
    data: data
  })
}

// 忘记密码
export function retrievePassword (params) {
  let data = {
    ...params
  }
  return axios({
    url: '/user/retrievePassword',
    method: 'post',
    data: data
  })
}

// 删除收货地址
export function deleteCateringContacts (params) {
  return axios({
    url: '/catering/contacts/deleteCateringContacts/' + params.userKey + '/' + params.id,
    method: 'post'
  })
}

// 获取用户好吃订单列表
export function queryMyOrderList (params) {
  return axios({
    url: '/catering/order/queryMyOrderList/' + params.userKey + '/' + params.pageNum,
    method: 'get'
  })
}
