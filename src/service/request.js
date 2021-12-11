import axios from 'axios'
import { BASE_URL } from './config'
import { Loading } from 'element-ui'

let loading
function startLoading() {
  //如果根实例设为变量VUE var VUE = new Vue({}) 也可写成下面的
  // loading = VUE.$loading({
  //   lock: true,
  //   text: "拼命加载中...",
  //   background: 'rgba(0,0,0,0.2)'
  // })
  loading = Loading.service({
    lock: true,
    text: '加载中...',
    background: 'rgba(0,0,0,0.2)'
  })
}

function endLoading() {
  loading.close()
}

export function request(url, params) {
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
      if (localStorage.getItem('token')) {
        // config.headers.common['token'] = localStorage.getItem('token')
      }
      startLoading()
      return config
    },
    err => {
      console.log(err)
    }
  )
  // 响应拦截
  instance.interceptors.response.use(
    config => {
      endLoading()
      return config
    },
    err => {
      console.log([err])
    }
  )

  instance.defaults.withCredentials = true
  // get请求
  if (params) {
    params = {
      params: params
    }
    return instance.get(url, params)
  } else {
    return instance.get(url)
  }
}
