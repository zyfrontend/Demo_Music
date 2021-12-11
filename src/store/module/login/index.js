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
    changeIsLogin(state, data) {
      state.isLogin = data
    }
  },
  actions: {
    async loginByCellphone({ commit }, account) {
      const { phone, password } = account
      let timestamp = Date.parse(new Date())
      let result = await request('/login/cellphone', {
        phone: phone,
        password: password,
        withCredentials: true,
        timestamp
      })

      const { code } = result.data
      if (code == 200) {
        Message({
          message: '登录成功',
          type: 'success'
        })
        const { token, cookie } = result.data
        commit('changeToken', token)
        commit('changeCookie', cookie)
        commit('changeProfile', result.data.profile)
        commit('changeIsLogin', true)
        window.localStorage.setItem('token', token)
        window.localStorage.setItem('cookie', cookie)
        window.localStorage.setItem('profile', JSON.stringify(result.data.profile))
      } else if (code == 400) {
        Message({
          message: result.data.message,
          type: 'error'
        })
      } else if (code == 502) {
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
    async logout({ commit, dispatch }) {
      window.localStorage.clear()
      await request('/logout')
      dispatch('recoverStore')
    },
    // 刷新验证登录
    async refreshLogin({commit}){
        const result_refresh = await request('/login/refresh')

        const result_status = await request('/login/status')
        // 1. 处于登录状态 返回data数据
        // 2. 未处于登录状态 返回 undefined
        if (result_status == undefined && result_refresh == undefined) {
          console.log('未处于登录状态')
          commit('changeIsLogin', false)
          return
        } else {
          console.log('处于登录状态')
          commit('changeIsLogin', true)
        }
    }
  }
}
