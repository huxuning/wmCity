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
// 获取首页餐饮子分类
export function querySubCategoryList (params = {}) {
  let data = {
    parentId: '',
    ...params
  }
  return axios({
    url: '/catering/category/querySubCategoryList/' + params.parentId,
    method: 'get',
    data: data
  })
}
//获取首页推荐商户列表
export function baseRestaurantList (params = {}) {
  let data = {
    pageNum: 1,
    ...params
  }
  console.log(data)
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
  console.log(data)
  return axios({
    url: '/catering/restaurant/queryCateringRestaurantList/1',
    method: 'post',
    data: data
  })
}

//获取商户信息
export function restaurantInfo (params) {
  console.log(params)
  return axios({
    url: '/catering/restaurant/readCateringRestaurantInfo/'+params.id,
    method: 'get'
  })
}