import axios from 'axios'
import qs from 'qs'
// import localStore from 'common/js/localStore'
import Toast from 'components/toast/'
import router from '../../router'
import cookie from 'common/js/cookie'
// 请求成功，返回的状态码不是200时调用
const statusError = (data) => {
  
  Toast.fail({
    message: data.resultDesc
  })
}

// 网络出错时调用
const requestError = (err) => {
  console.log(err)
  let errorText = ''
  if (err.response && err.response.status) {
    errorText = '请求错误：' + err.response.status + ',' + err.response.statusText
  }
  if (/Error/.test(err)) {
    errorText = '请求超时'
  }
  Toast.fail({
    message: errorText
  })
}

axios.defaults.timeout = 30 * 1000
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8'
axios.defaults.baseURL = ''

axios.interceptors.request.use((config) => {
  if (config.data && config.data.isValidateRequest) {
    axios.isValidateRequest = config.data.isValidateRequest
  }

  // if (config.data) {
  //   config.data.token = localStore.get('token', '')
  // }

  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, (err) => {
  return Promise.reject(err)
})

axios.interceptors.response.use((rs) => {
  console.log(rs)
  if (rs.data.resultCode) {
    if (rs.data.resultCode !== 999999 && rs.data.resultCode !== '999999') {
      // 重定向登录
      // if (rs.data.resultCode === 500) {
      //   cookie.del('auth_code')
      //   // document.cookie = 'auth_code=' + ' '
      //   router.push({
      //     path: '/login'
      //   })
      //   return
      // }
      if (axios.isValidateRequest !== true) {
        statusError(rs.data)
      }
      return Promise.reject(rs.data.resultData)
    }
  } else {
    console.log('数据格式返回有误')
    return
  }
  return rs
}, (err) => {
  requestError(err)
  // return Promise.reject(err)
})

export default function (options) {
  if (!options) {
    return
  }

  let config = {
    url: options.url,
    method: options.method
  }
  if (options.method === 'get') {
    config.params = options.data
  }
  if (options.method === 'post') {
    config.data = options.data
  }
  console.log (config)
  return new Promise((resolve, reject) => {
    axios(config).then((rs) => {
      resolve(rs.data)
    }, (err) => {
      reject(err)
    }).catch((err) => {
      reject(err)
    })
  })
}
