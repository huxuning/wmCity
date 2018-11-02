import axios from 'common/js/axios'
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
