<template>
  <div class="player-bar">
    <audio :src="musicUrl" autoplay ref="audioPlayer" @ended="switchMusic('next')"></audio>
    <div class="bar-left">
      <!-- img -->
      <div class="avatar">
        <img :src="musicDetail.al.picUrl" alt="" v-if="musicDetail.al" />
        <img src="../../../assets/img/test.jpg" alt="" />
      </div>
    </div>
    <div class="bar-center">
      <!-- 控件 -->
      <player-control @switchMusic="switchMusic"></player-control>
    </div>
    <div class="bar-right">
      <!-- 音量 列表 -->
      <control-list></control-list>
    </div>
  </div>
</template>

<script>
import PlayerControl from './player-control.vue'
import ControlList from './control-list.vue'
export default {
  components: {
    PlayerControl,
    ControlList
  },
  data() {
    return {
      // 音乐url
      musicUrl: '',
      // 歌单列表
      musicList: [],
      // 音乐详情
      musicDetail: {},
      // 记录当前音乐的index
      currentMusicIndex: '',
      // 播放模式 order random
      playType: 'order'
    }
  },
  methods: {
    // 获取歌曲URL
    async getMusicUrl(id) {
      let result = await this.$request('/song/url', { id })
      // 将URl传入组件
      this.musicUrl = result.data.data[0].url
      // console.log(result.data);
    },
    // 获取音乐详情
    // 根据id找到 musicList中对应的musicDetail
    getMusicDetailFromMusicList() {
      let index = this.musicList.findIndex(item => item.id == this.$store.state.musicId)
      // console.log(index)
      if (index != -1) {
        // 记录当前音乐的index
        this.currentMusicIndex = index
        // 将索引传至vuex
        this.$store.commit('updateCurrentIndex', index)
        this.musicDetail = this.musicList[index]
        // console.log(this.musicDetail)
      }
    },
    // 歌曲切换
    switchMusic(type, id) {
      // console.log('Switch', type)
      let currentMusicIndex = this.currentMusicIndex
      switch (type) {
        // 上一首
        case 'pre':
          currentMusicIndex = this.currentMusicIndex
          let preIndex
          if (this.playType == 'order') {
            preIndex = currentMusicIndex - 1 < 0 ? this.musicList.length - 1 : currentMusicIndex - 1
            // console.log(preIndex);
          } else if (this.playType == 'random') {
            if (this.musicList.length == 1) {
              preIndex = currentMusicIndex
            } else {
              // Math.floor(Math.random()*10); 可均衡获取0到9的随机整数。
              preIndex = currentMusicIndex
              while (preIndex == currentMusicIndex) {
                preIndex = Math.floor(Math.random() * this.musicList.length)
              }
            }
          }
          // musicList 为空会报错
          // console.log(this.musicList[preIndex].id)

          return this.$store.commit('updateMusicId', this.musicList[preIndex].id)
        // 下一首
        case 'next':
          currentMusicIndex = this.currentMusicIndex
          let nextIndex
          if (this.playType == 'order') {
            nextIndex = currentMusicIndex + 1 == this.musicList.length ? 0 : currentMusicIndex + 1
          } else if (this.playType == 'random') {
            if (this.musicList.length == 1) {
              nextIndex = currentMusicIndex
            } else {
              // Math.floor(Math.random()*10); 可均衡获取0到9的随机整数。
              nextIndex = currentMusicIndex
              while (nextIndex == currentMusicIndex) {
                nextIndex = Math.floor(Math.random() * this.musicList.length)
              }
            }
          }
          // console.log(this.musicList[nextIndex].id)
          // this.$store.commit("updateMusicId", this.musicList[nextIndex].id);
          return this.$store.commit('updateMusicId', this.musicList[nextIndex].id)
        case 'click':
          return this.$store.commit('updateMusicId', id)
        default:
          return null
      }
    },

    // 自定义控件
    // 播放音乐的函数
    playMusic() {
      this.$refs.audioPlayer.play()
    },
    // 暂停音乐的函数
    pauseMusic() {
      this.$refs.audioPlayer.pause()
    }
  },
  watch: {
    // 监听 vuex 中 musicId
    '$store.state.musicId'(id) {
      // console.log("vuex中的id发生了变化", id);
      // 暂停播放的歌曲
      this.pauseMusic()
      // 重新获取URL
      this.getMusicUrl(id)
      // 获取歌单列表
      this.musicList = this.$store.state.musicList
      // 获取当前音乐详情
      this.getMusicDetailFromMusicList()
    },
    // 监听 currentIndex 变化
    '$store.state.currentIndex'(currentIndex, lastIndex) {
      // currentIndex 当前 index
      // lastIndex 之前的 index
    },
    // 监听播放状态
    '$store.state.isPlay'(isPlay) {
      if (isPlay) {
        this.playMusic()
      } else {
        this.pauseMusic()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.player-bar {
  border-top: 1px solid #ddd;
  width: 100%;
  height: 55px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: 6px 10px;
  z-index: 10000;
  background-color: white;
  .bar-left {
    display: flex;
    align-items: center;
    width: 123px;
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 5px;
      overflow: hidden;
      margin-right: 10px;
      cursor: pointer;
    }
    .avatar img {
      width: 100%;
    }
  }
  .bar-center {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  .bar-right {
    width: 123px;
    position: relative;
  }
}
</style>
