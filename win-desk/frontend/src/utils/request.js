import axios from 'axios'
import { ElNotification  } from 'element-plus'
import { getToken } from '@/utils/auth'

// 创建axios实例
const http = axios.create({
  baseURL: import.meta.env.VUE_APP_BASE_API,
  timeout: 5000 // 请求超时时间
})

const CancelToken = axios.CancelToken;
const source = CancelToken.source();


console.log(1)

// 请求拦截器
http.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = token;
    }
  //    source.cancel()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

console.log(2)

// 错误处理
const errorHandler = error => {

    console.log(14)

  console.log('err' + error) // for debug
 // ElNotification({
 //   message: error.message,
//    type: 'error',
//    duration: 5 * 1000
//  })
//  return Promise.reject(error)
}

// 响应拦截器
http.interceptors.response.use(

  response => {
      console.log(24,response.data)
    const binary = ['blob', 'ArrayBuffer']
    if (binary.includes(response.config.responseType)) {
      return response
    }
    return response.data
  }, errorHandler)

export default http
