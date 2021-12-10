import { request } from '@/service/request'
import router from '@/router'

import { formatMinuteSecond } from '@/utils/formatDate.js'
import { parseLyric } from '@/utils'
export default {
  namespaced: true,
  state() {
    return {
      // 歌曲ID
      musicId: '',
      // 歌单详情
      musicListDetail: {},
      // 歌曲列表
      musicList: [],
      // 歌单id
      musicListId: '',
      // 歌曲Url
      musicUrl: '',
      // 当前音乐的index
      currentMusicIndex: -1,
      //   单曲详情
      musicDetail: {},
      //   当前单曲总时长
      duration: '00:00',
      // 当前单曲现在播放到的时间点
      currentTime: 0,
      //   播放状态
      isPlay: false,
      // 音乐详情卡片的显隐
      isMusicDetailCardShow: false,
      // 歌词
      lyric: [[0, '正在加载歌词']],
      //当前评论页数
      currentCommentPage: 1,
      // 评论总页数
      total: 0,
      // 普通评论
      comments: [],
      // 评论是否在加载中
      isCommentLoading: false,
      // 热门评论
      hotComments: [],
      // vip
      isVip: false
    }
  },
  mutations: {
    // 歌去id
    changeMusicId(state, data) {
      state.musicId = data
    },
    // 歌单详情列表
    changeMusicListDetail(state, data) {
      state.musicListDetail = data
    },
    // 歌曲列表
    changeMusicList(state, data) {
      state.musicList = data
    },
    // 歌单id
    changeMusicListId(state, data) {
      state.musicListId = data
    },
    // url
    changeMusicUrl(state, data) {
      state.musicUrl = data
    },
    changeCurrentMusicIndex(state, data) {
      state.currentMusicIndex = data
    },
    changeMusicDetail(state, data) {
      state.musicDetail = data
    },
    changeDuration(state, data) {
      state.duration = data
    },
    changeCurrentTime(state, data) {
      state.currentTime = data
    },
    changeIsPlayer(state, data) {
      state.isPlay = data
    },
    // 切换单曲详情卡片的显隐
    changeMusicDetailCardState(state) {
      state.isMusicDetailCardShow = !state.isMusicDetailCardShow
    },
    changeLyric(state, data) {
      state.lyric = data
    },
    // 热门评论
    changeHotComments(state, data) {
      state.hotComments = data
    },
    // 普通评论
    changeComment(state, data) {
      state.comments = data
    },
    // 热门评论
    changeTotal(state, data) {
      state.total = data
    },
    changeIsVip(state, data) {
      state.isVip = data
    }
  },
  actions: {
    // 根据传来的 id 查询歌单
    async getMusicListDetail({ commit }, payload) {
      let timestamp = Date.parse(new Date())
      const result = await request('/playlist/detail', {
        id: router.currentRoute.params.id,
        timestamp
      })
      //   处理时间
      const formatdata = result.data.playlist
      formatdata.tracks.forEach((item, index) => {
        formatdata.tracks[index].dt = formatMinuteSecond(item.dt)
      })
      // 保存需要播放的歌单列表
      commit('changeMusicList', formatdata.tracks)

      // 保存详情
      commit('changeMusicListDetail', formatdata)

      //   commit('changeMusicListId', router.currentRoute.params.id)
    },

    // 播放组件
    // 播放歌曲url
    async getMusicUrl({ commit }, id) {
      const result = await request('/song/url', { id })
      //   // 将URl传入组件
      if (result.data.data[0].url == null) {
        commit('changeIsVip', true)
      }
      //   this.musicUrl = result.data.data[0].url
      commit('changeMusicUrl', result.data.data[0].url)
    },

    // 单曲详情
    getMusicDetailFromMusicList({ commit, state }, id) {
      let index = state.musicList.findIndex(item => item.id == id)
      if (index != -1) {
        commit('changeCurrentMusicIndex', index)
        commit('changeMusicDetail', state.musicList[index])
        commit('changeDuration', state.musicList[index].dt || state.musicList[index].duration)
      }
    },

    // 歌词
    async getLyric({ commit }, id) {
      let res = await request('/lyric', { id })

      const lyric = parseLyric(res.data.lrc.lyric)

      commit('changeLyric', lyric)
    },

    // 单曲评论
    // 请求评论数据
    async getMusicComment({ commit, state }, id, type) {
      // 获取时间戳
      var timestamp = Date.parse(new Date())

      let res = await request('/comment/music', {
        id,
        offset: (state.currentCommentPage - 1) * 20,
        timestamp
      })

      // 热门评论
      commit('changeHotComments', res.data.hotComments)
      // 普通评论
      commit('changeComment', res.data.comments)
      // 评论页数
      commit('changeTotal', res.data.total)

      // if (res.data.code !== 200) {
      //   this.$message.error('获取评论失败,请稍后重试!')
      // }

      // this.isCommentLoading = false
      // this.comment = res.data
    }
  }
}
