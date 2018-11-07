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
// 获取首页餐饮子分类  (弃)
export function querySubCategoryList (params = {}) {
  let data ={
    ...params
  }
  return axios({
    url: '/catering/category/querySubCategoryList/' + (params.parentId ? params.parentId : 0),
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
  console.log(params)
  return axios({
    url: '/catering/restaurant/readCateringRestaurant/'+params.id,
    method: 'get'
  })
}

//获取商品分类信息
export function goodsCategoryList (params) {
  return axios({
    url: '  /catering/goodsCategory/queryGoodsCategoryList/'+params.id,
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