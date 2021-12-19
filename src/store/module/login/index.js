import { request } from '@/service/request'
import { Message } from 'element-ui'

export default {
  namespaced: true,
  state() {
    return {
      token: '',
      cookie: '',
      profile: {},
      isLogin: false
    }
  },
  mutations: {
    changeToken(state, data) {
      state.token = data
    },
    changeCookie(state, data) {
      state.cookie = data
    },
    changeProfile(state, data) {
      state.profile = data
    },
    changeIsLogin(state, data=false) {
      state.isLogin = data
    }
  },
  actions: {
    async loginByCellphone({ commit, dispatch }, account) {
      const { phone, password } = account
      let timestamp = Date.parse(new Date())
      let result = await request('/login/cellphone', {
        phone: phone,
        password: password,
        withCredentials: true,
        timestamp
      })

      const { code } = (result && result.data) || ''
      if (code === 200) {
        Message({
          message: '登录成功',
          type: 'success'
        })

        // 获取用户信息


        const { token, cookie } = result.data
        commit('changeToken', token)
        commit('changeCookie', cookie)
        commit('changeProfile', result.data.profile)
		commit('changeIsLogin', true)
        window.localStorage.setItem('token', token)
        window.localStorage.setItem('cookie', cookie)
        window.localStorage.setItem('profile', JSON.stringify(result.data.profile))
      } else if (code === 400) {
        Message({
          message: result.data.message,
          type: 'error'
        })
      } else if (code === 502) {
        Message({
          message: result.data.message,
          type: 'error'
        })
      } else {
        Message({
          message: '登录失败请重试',
          type: 'error'
        })
      }
    },
    // 获取用户信息
    async getUserInfo({commit}){
      const result = await request('/user/account')
      console.log(result)
    },
    // 恢复数据
    recoverStore({ commit }) {
      const token = window.localStorage.getItem('token')
      const cookie = window.localStorage.getItem('cookie')
      const profile = JSON.parse(window.localStorage.getItem('profile'))

      commit('changeToken', token)
      commit('changeCookie', cookie)
      commit('changeProfile', profile)
      
      
    },
    // 退出登录
    async logout({ commit }) {
      window.localStorage.clear()
      await request('/logout')
      commit('changeIsLogin', false)
    },
    // 刷新验证登录
     async refreshLogin({commit, dispatch}){
       await request('/login/refresh')
       const result = await request('/login/status')
       const {userId} = result.data.profile
       console.log(result);
       console.log(userId);
       if(userId){
         dispatch('recoverStore')
         commit('changeIsLogin', true)
       }
     }
  }
}
