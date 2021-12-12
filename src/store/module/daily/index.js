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
    async getRecommendSongs_default({ commit }) {
      const result = await request('/recommend/songs')
      const formatdata = result.data.data.dailySongs
      formatdata.forEach((item, index) => {
        formatdata[index].dt = formatMinuteSecond(item.duration)
        formatdata[index].al = item.album
        formatdata[index].ar = item.artists
      })
      commit('changeRecommendSongs', result.data.data.dailySongs)
    },
    async getRecommendSongs({commit}){
      const result = await request('/recommend/songs')
      console.log(result)
      if(result.data){
        const formatData = result.data
        // 格式化 歌曲时间
        formatData.recommend.forEach((item, index) => {
          formatData.recommend[index].dt = formatMinuteSecond(item.duration)
          formatData.recommend[index].al = item.album
          formatData.recommend[index].ar = item.artists
        })
        commit('changeRecommendSongs', result.data.recommend)
        console.log(formatData)
      }


    }
  }
}
