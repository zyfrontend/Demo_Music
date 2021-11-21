import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 音乐的url
    musicId: '',
    // 音乐的播放状态
    isPlay: false,
    // 当前播放的歌单
    musicList: [],
    // 当前播放歌单的id
    musicListId: '',
    // 当前播放音乐的索引
    currentIndex: -1
  },
  mutations: {
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
    }
  },
  actions: {},
  modules: {}
})
