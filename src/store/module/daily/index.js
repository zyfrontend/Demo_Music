import { request } from '@/service/request'
import { formatMinuteSecond } from '@/utils/formatDate.js'

export default {
  namespaced: true,
  state() {
    return {
      recommendSongs: []
    }
  },
  mutations: {
    changeRecommendSongs(state, data) {
      state.recommendSongs = data
    }
  },
  actions: {
    async getRecommendSongs({ commit }) {
      const result = await request('/recommend/songs')
      const formatdata = result.data.data.dailySongs
      formatdata.forEach((item, index) => {
        formatdata[index].dt = formatMinuteSecond(item.duration)
        formatdata[index].duration = formatMinuteSecond(item.duration)
        formatdata[index].al = item.album
        formatdata[index].ar = item.artists
      })
      commit('changeRecommendSongs', result.data.data.dailySongs)
    }
  }
}
