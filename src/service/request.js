import axios from 'axios'
import vuex from '../store/index'
import { BASE_URL } from './config'
// 该项目所有请求均为 get请求
export function request(url, params) {
  // 请求超过30秒则判定为超时
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    withCredentials: true
  })

  // axios拦截器
  // 请求拦截
  instance.interceptors.request.use(
    config => {
      // console.log('请求拦截器');
      return config
    },
    err => {
      console.log(err)
    }
  )

  // 响应拦截
  instance.interceptors.response.use(
    config => {
      return config
    },
    err => {
      console.log([err])
    }
  )

  instance.defaults.withCredentials = true

  if (params) {
    params = {
      params: params
    }
    return instance.get(url, params)
  } else {
    return instance.get(url)
  }
}
