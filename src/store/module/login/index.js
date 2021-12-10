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
        window.localStorage.setItem('isLogin', true)
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
      const isLogin = window.localStorage.getItem(true)

      commit('changeToken', token)
      commit('changeCookie', cookie)
      commit('changeProfile', profile)
      commit('changeIsLogin', isLogin)
    },
    // 退出登录
    async logout({ commit, dispatch }) {
      window.localStorage.clear()
      await request('/logout')
      await request('/login/refresh')
      await request('/login/status')

      dispatch('recoverStore')
    }
  }
}
