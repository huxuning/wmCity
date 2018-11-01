import axios from 'common/js/axios'
var local = 'https://i.wemecity.net'
export function baseCategoryList (params = {}) {
  let data = {
    ...params
  }
  return axios({
    url: local+'/catering/category/queryBaseCategoryList',
    method: 'get',
    data: data
  })
}
