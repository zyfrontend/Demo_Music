import { request } from '@/service/request'
export default {
  namespaced: true,
  state() {
    return {
      // 轮播图
      banners: [],
      // 首页歌单
      recommendList: [],
      // 歌单页面顶部热门图
      theFirstOfHighquality: {},
      // 热门标签
      hotTags: [],
      // 当前展示标签
      currentTag: {},
      // 标签列表
      sortList: [],
      currentPage: 1,
      musicList: {}
    }
  },
  mutations: {
    // recommend

    // 保存 banners
    changeBanners(state, data) {
      state.banners = data
    },
    // 保存前 10 歌单
    changeRecommendList(state, data) {
      state.recommendList = data
    },

    // musiclist
    // 保存高质量封面
    changeTheFirstOfHighquality(state, data) {
      state.theFirstOfHighquality = data
    },
    changeHotTags(state, data) {
      state.hotTags = data
    },
    changeCurrentTag(state, data) {
      state.currentTag = data
    },
    changeSortList(state, data) {
      state.sortList = data
    },
    changeMusicList(state, data) {
      state.musicList = data
    },
    changeCurrentPage(state, data) {
      state.currentPage = data
    }
  },
  actions: {
    // recommend

    // 请求轮播图数据
    async getBannerData({ commit }) {
      const result = await request('/banner')
      commit('changeBanners', result.data.banners)
      // localStorage 保存数据
      // 图片数据太大了 算了算了
      // localCache.setCache('banners', result.data.banners)
    },

    // 请求前10歌单
    async getRecommendList({ commit }) {
      const result = await request('/personalized', { limit: 10 })
      commit('changeRecommendList', result.data.result)
      // localStorage 保存数据
      // 图片数据太大了 算了算了
      // localCache.setCache('banners', result.data.result)
    },

    // musiclist
    // 获取高质量歌单的第一条数据
    async getTheFirstOfHighquality({ commit }) {
      let result = await request('/top/playlist/highquality', {
        limit: 1
      })
      commit('changeTheFirstOfHighquality', result.data.playlists[0])
    },

    // 获取热门歌单tag数据
    async getHotTag({ commit }) {
      let result = await request('/playlist/hot')
      // console.log(result);
      commit('changeHotTags', result.data.tags)
      commit('changeCurrentTag', result.data.tags[0])
    },

    // 获取歌单分类数据
    // 子组件 emit 事件
    async getSortList({ commit }) {
      let res = await request('/playlist/catlist')
      commit('changeSortList', res.data.sub)
    },
    // 根据歌名请求歌单列表
    async getMusicList({ commit, state }) {
      let result = await request('/top/playlist', {
        cat: state.currentTag.name,
        offset: 50 * (state.currentPage - 1)
      })
      // console.log('1', result)

      commit('changeMusicList', result.data)
    },

    // 更新数据
    changeTest({ commit }, payload) {
      // commit('changeCurrentPage', )
      // console.log('111', payload)
    }
  }
}
