import { request } from '@/service/request'
import { Message } from 'element-ui'

export default {
  namespaced: true,
  state() {
    return {
      token: '',
      cookie: '',
      profile: {}
    }
  },
  mutations: {
    changeToken(state, data) {
      state.token = data
      window.localStorage.setItem('token', data)
    },
    changeCookie(state, data) {
      state.cookie = data
      window.localStorage.setItem('cookie', data)
    },
    changeProfile(state, data) {
      state.profile = data
      window.localStorage.setItem('profile', JSON.stringify(data))
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
        console.log(result)
        const { token, cookie } = result.data
        commit('changeToken', token)
        commit('changeCookie', cookie)
        commit('changeProfile', result.data.profile)
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
      await request('/logout')
      const result_refresh = await request('/login/refresh')
      const result_status = await request('/login/status')
      window.localStorage.clear()
      dispatch('recoverStore')
    }
  }
}
