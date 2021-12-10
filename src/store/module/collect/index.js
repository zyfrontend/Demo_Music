import { request } from '@/service/request'

export default {
  namespaced: true,
  state() {
    return {
      userMusicList: []
    }
  },
  mutations: {
    changeUserMusicList(state, data) {
      state.userMusicList = data
    }
  },
  actions: {
    async getUserMusicList({ commit }) {
      const profile = JSON.parse(window.localStorage.getItem('profile'))
      const userId = profile.userId
      const result = await request(`/user/playlist?uid=${userId}`)
      commit('changeUserMusicList', result.data.playlist)
    }
  }
}
