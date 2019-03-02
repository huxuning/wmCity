
import axios from 'common/js/axios'

//手机区号
export function getBaiduLocation (params = {}) {
  let data = {
    ...params
  }
  return axios({
    url: '/user/getPhoneIntenationalArea',
    method: 'get',
    data: data
  })
}
//提交支付接口
export function orderpay (params = {}) {
  let data = {
    ...params
  }
  return axios({
    url: '/catering/order/pay',
    method: 'post',
    data: data
  })
}
//支付接口
export function pay (params = {}) {
  let data = {
    ...params
  }
  return axios({
    url: '/stripePay/pay',
    method: 'post',
    data: data
  })
}
//汇率查询
export function getExchangeRate (params = {}) {
  let data = {
    ...params
  }
  return axios({
    url: '/components/exchangeRate/getExchangeRate',
    method: 'get',
    data: data
  })
}