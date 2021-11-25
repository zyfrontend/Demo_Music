import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 音乐的url
    musicId: '',
    // 当前播放的歌单
    musicList: [],
    // 当前正在播放的歌单id
    musicListId: '',
    // 当前播放音乐索引
    currentIndex: 0,
    // 播放状态
    isPlay: false,
    // 歌曲时长
    duration: '',
    // 音乐详情卡片的显隐
    isMusicDetailCardShow: false
  },
  mutations: {
    // 歌单双击的歌曲ID
    updateMusicId(state, musicId) {
      state.musicId = musicId
      // console.log('updateMusicId', musicId)
      // localCache.setCache('musicId', musicId)
    },
    // 更新歌单列表和歌单id
    updateMusicList(state, payload) {
      // 当歌单id发生变化时,重置当前播放音乐索引
      if (payload.musicListId != state.musicListId) {
        state.musicListId = payload.musicListId
        state.currentIndex = -1
      }
      // console.log(state.currentIndex);
      // 对歌单进行深拷贝再赋值 直接赋值是浅拷贝
      // 歌单是固定的死数据，而vuex中的musicList是动态的
      let musicList = payload.musicList.slice(0)
      state.musicList = musicList

      // console.log('updateMusicList');
    },
    // 当前播放音乐的索引
    updateCurrentIndex(state, index) {
      state.currentIndex = index

      // console.log(state.currentIndex);
    },
    // 当前播放时间位置
    updateCurrentTime(state, time) {
      // window.localStorage.setItem('duration', JSON.stringify(time))

      state.duration = time
    },

    // 修改播放状态
    changePlayState(state, isPlay) {
      state.isPlay = isPlay
      // console.log('changePlayState');
    },
    // 切换音乐详情卡片的显隐
    changeMusicDetailCardState(state) {
      state.isMusicDetailCardShow = !state.isMusicDetailCardShow
    }
  },
  actions: {},
  modules: {}
})

export default store
