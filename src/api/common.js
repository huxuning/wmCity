
import axios from 'common/js/axios'

//baidu地图搜索地址
export function getBaiduLocation (params = {}) {
  let data = {
    ...params
  }
  return axios({
    url: '/place/v2/suggestion',
    method: 'get',
    data: data
  })
}
