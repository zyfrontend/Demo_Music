import { request } from '@/service/request'

import { formatMinuteSecond } from '@/utils/formatDate.js'

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
      currentTag: {
        name: '华语'
      },
      // 标签列表
      sortList: [],
      // 当前显示页
      currentPage: 1,
      // 当前显示页歌单列表
      musicList: {},
      // 歌单封面等信息
      officialList: [],
      // 歌单列表等信息
      officialListDetail: [],
      // 全球榜
      globalList: [],
      // 歌手列表
      singerList: [],
      area: -1,
      type: -1,
      initial: -1,
      // 当前所在页数
      singerCurrentPage: 1,
      // 是否存在更多数据
      isMore: false
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
    },
    // 歌单封面等信息
    changeOfficialList(state, data) {
      state.officialList = data
    },
    // 歌单列表等信息
    changeOfficialListDetail(state, data) {
      state.officialListDetail.push(data)
    },
    // 全球榜
    changeGlobalList(state, data) {
      state.globalList = data
    },
    // 歌手列表
    changeSingerList(state, data) {
      state.singerList = data
    },
    changeSingerArea(state, data) {
      state.area = data
    },
    changeSingerCurrentPage(state, data) {
      state.singerCurrentPage = data
    },
    changeSingerType(state, data) {
      state.type = data
    },
    changeSingerInitial(state, data) {
      state.initial = data
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

      commit('changeMusicList', result.data)
    },

    // 排行榜

    // 请求所有榜单
    async getAllRankings({ commit, state, dispatch }) {
      let res = await request('/toplist')
      commit('changeOfficialList', res.data.list.slice(0, 4))
      commit('changeGlobalList', res.data.list.slice(4))
      // 清空
      // state.officialListDetail = []
      state.officialList.forEach(item => {
        return dispatch('getMusicListDetail', item.id)
      })
    },

    // 请求榜单详情
    // 根据榜单id请求详细数据
    // 根据传来的 id 查询歌单
    async getMusicListDetail({ commit, state }, id) {
      let result = await request('/playlist/detail', { id })
      // console.log(result)
      result = result.data.playlist
      // console.log(result)
      // 对时间进行处理
      result.tracks.forEach((item, index) => {
        result.tracks[index].dt = formatMinuteSecond(item.dt)
      })
      // console.log(result)
      commit('changeOfficialListDetail', result)
    },

    // 请求歌手列表
    async getSingerList({ commit, state }) {
      let res = await request('/artist/list', {
        type: state.type,
        area: state.area,
        initial: state.initial,
        offset: (state.singerCurrentPage - 1) * 30
      })
      commit('changeSingerList', res.data.artists)
    }
  }
}
