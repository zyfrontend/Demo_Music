<template>
  <div class="player-bar">
    <audio
      :src="musicUrl"
      autoplay
      ref="audioPlayer"
      @play="changeState(true)"
      @pause="changeState(false)"
      @ended="switchMusic('next')"
      @timeupdate="timeupdate"
    ></audio>
    <div class="bar-left">
      <!-- img -->
      <div class="avatar" @click="$store.commit('player/changeMusicDetailCardState')">
        <img :src="musicDetail.al.picUrl" alt="" v-if="musicDetail.al" />
        <img src="../../../assets/img/test.jpg" alt="" v-else />
      </div>
      <div class="music-info" v-if="musicDetail && musicDetail.name">
        <div class="music-name">{{ musicDetail.name }}</div>
        <div class="music-author">{{ musicDetail.ar[0].name}}</div>
      </div>
    </div>
    <div class="bar-center">
      <!-- 控件 -->
      <div class="player-control">
        <!-- 按钮 -->
        <div class="control-btn">
          <span @click="playType = playType == 'order' ? 'random' : 'order'"
            ><i class="iconfont icon-xunhuan" v-if="playType === 'order'"></i><i class="iconfont icon-suiji1" v-else></i
          ></span>
          <span><i class="iconfont icon-shangyishou" @click="switchMusic('pre')"></i></span>
          <span @click="musicList.length != 0 ? changePlayState() : ''">
            <i class="iconfont icon-icon_play" v-if="!isPlay"></i>
            <i class="iconfont icon-zantingtingzhi" v-else></i>
          </span>
          <span><i class="iconfont icon-xiayishou" @click="switchMusic('next')"></i></span>
          <span @click="$warn()"><i class="iconfont icon-xihuan"></i></span>
        </div>
        <!-- 时间进度条 -->
        <div class="control-progress">
          <span class="currentTime">{{ currentTime | handleMusicTime }}</span>
          <!-- :value 是单向的  要实现双向要v-model -->
          <el-slider
            class="progressSlider"
            v-model="timeProgress"
            :show-tooltip="false"
            @change="changeProgress"
            :disabled="musicList.length == 0"
          ></el-slider>
          <span class="totalTime">{{ duration }}</span>
        </div>
      </div>
    </div>
    <div class="bar-right">
      <!-- 音量 列表 -->
      <div class="control-list">
        <div class="volumeControl">
          <i class="iconfont icon-yinliang" @click="changeMutedState"></i>
          <el-slider class="volumeSlider" @input="changeVolume" v-model="volume" :show-tooltip="false"></el-slider>
        </div>
        <div class="playList" @click="openDrawer">
          <i class="iconfont icon-bofangliebiao"></i>
        </div>
        <!-- 列表 -->
        <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false" width="300">
          <div class="drawerHeader">总 {{ musicList.length }} 首</div>
          <el-table :data="musicList" stripe style="width: 100%" :show-header="false" @row-dblclick="clickRow" highlight-current-row lazy>
            <el-table-column prop="name" width="150px"> </el-table-column>
            <el-table-column prop="ar[0].name" width="80px"> </el-table-column>
            <el-table-column prop="dt" width="70px"> </el-table-column>
          </el-table>
        </el-drawer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { returnSecond, handleMusicTime } from '@/utils'
import ControlList from './control-list.vue'
let lastSecond = 0
let durationNum = 0
// 保存当前音量
let volumeSave = 0;
export default {
  components: {
    ControlList
  },
  data() {
    return {
      // 歌曲列表
      musicList: [],
      // 记录当前音乐的index
      currentMusicIndex: '',
      // 播放模式 order random
      playType: 'order',
      drawer: false,
      currentMusicIndex: 0,
      // 抽屉是否被打开过（如果没打开过，里面的数据是不会渲染的）
      hasDrawerOpend: false,
      // 当前播放时间位置
      currentTime: 0,
      // 进度条的位置
      timeProgress: 0,
      // 播放模式（顺序播放，随机播放）
      // order random
      playType: 'order',
      // 音量
      volume: 30,
      // 是否静音
      isMuted: false,
    }
  },
  methods: {
    // 歌曲切换
    switchMusic(type, id) {
      // console.log('Switch', type)
      let currentMusicIndex = this.$store.state.player.currentMusicIndex
      switch (type) {
        // 上一首
        case 'pre':
          currentMusicIndex = this.$store.state.player.currentMusicIndex
          let preIndex
          // 判断播放状态--循环列表
          if (this.playType == 'order') {
            // 获取待播放歌曲索引值
            preIndex = currentMusicIndex - 1 < 0 ? this.musicList.length - 1 : currentMusicIndex - 1
            // console.log(preIndex);
            // 判断播放状态--随机列表
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
          // this.$store.commit('player/changeMusicId', this.musicList[preIndex].id)
          this.$store.commit('player/changeCurrentMusicIndex', preIndex)
          this.$store.commit('player/changeDuration', this.musicList[preIndex].dt)
          // 这里 return 只能去修改 id
          // 下面watch 已经监听了vuex 中 id 的改变并重新获取 url，
          // 如果这里去重新获取url，会导致歌曲无法正确切换，因为vuex中的id并没发生改变，
          // 为了使id 改变就必须 commit 修改id，
          // 然后才去重新获取url， 但是这里修改了id 下面的watch就会获取最新的url，所以我们直接改变id
          return this.$store.commit('player/changeMusicId', this.musicList[preIndex].id)
        // 下一首
        case 'next':
          currentMusicIndex = this.$store.state.player.currentMusicIndex
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
          this.$store.commit('player/changeCurrentMusicIndex', nextIndex)
          this.$store.commit('player/changeDuration', this.musicList[nextIndex].dt)

          return this.$store.commit('player/changeMusicId', this.musicList[nextIndex].id)
        default:
          return null
      }
    },
    // 播放列表
    openDrawer() {
      this.drawer = !this.drawer
      this.hasDrawerOpend = true
      this.handleDrawerListDOM(this.currentMusicIndex)
      // console.log('open')
    },
    // 当前播放的时间
    timeupdate() {
      let time = this.$refs.audioPlayer.currentTime
      time = Math.floor(time)
      // console.log(timer)
      // lastSecond 默认 0
      if (time !== lastSecond) {
        //   // console.log(time)
        lastSecond = time
        this.$store.commit('player/changeCurrentTime', time)
        //   // 计算进度条的位置
        durationNum = returnSecond(this.$store.state.player.duration)
        // console.log(time, durationNum)
        this.timeProgress = Math.floor((time / durationNum) * 100)
      }

    },
    // 拖动进度条
    // 拖动进度条的回调
    changeProgress(e) {
      // 修改当前播放时间
      let time = Math.floor((e / 100) * durationNum)
      this.$store.commit('player/changeCurrentTime', time)

      // 改变audio的实际当前播放时间
      this.$refs.audioPlayer.currentTime = time
    },
    clickRow() {
      // console.log('111')
    },

    changeVolume(e) {
      // 改变audio的音量
      // input事件 实时触发
      this.$refs.audioPlayer.volume = e / 100;
      if (this.isMuted && e > 0) {
        this.isMuted = false;
      } else if (e == 0 && this.isMuted == false) {
        this.isMuted = true;
      }
    },
    // 点击小喇叭的回调 （切换静音状态）
    changeMutedState() {
      if (this.isMuted) {
        this.volume = volumeSave;
      } else {
        volumeSave = this.volume;
        this.volume = 0;
      }
      console.log(volumeSave, this.isMuted);
      this.isMuted = !this.isMuted;
    },

    // 点击播放键的回调
    changePlayState() {
      !this.$store.state.player.isPlay ? this.playMusic() : this.pauseMusic()
    },
    // audio开始或暂停播放的回调  在vuex中改变状态
    changeState(state) {
      this.$store.commit('player/changeIsPlayer', state)
    },
    // 操作drawerList中DOM的函数， 添加当前正在播放歌曲高亮样式
    handleDrawerListDOM(currentIndex, lastIndex) {
      // 目前没什么好思路 直接操作原生DOM
      this.$nextTick(() => {
        let tableRows = document.querySelector('.bar-right').querySelectorAll('.el-table__row')

        // // 直接修改dom样式的颜色无效  可能是因为第三方组件 style scoped的原因
        // // 通过引入全局样式解决
        // console.log(tableRows)

        if (tableRows[currentIndex]) {
          tableRows[currentIndex].children[0].querySelector('.cell').classList.add('currentRow')
          tableRows[currentIndex].children[1].querySelector('.cell').classList.add('currentRow')
        }
        if ((lastIndex && lastIndex != -1 && tableRows[lastIndex]) || lastIndex == 0) {
          // 将上一首的类名删掉
          tableRows[lastIndex].children[0].querySelector('.cell').classList.remove('currentRow')
          tableRows[lastIndex].children[1].querySelector('.cell').classList.remove('currentRow')
        }
      })
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
  computed: {
    ...mapState('player', {
      musicUrl: state => state.musicUrl
    }),
    ...mapState('player', {
      musicListDetail: state => state.musicListDetail
    }),
    ...mapState('player', {
      duration: state => state.duration
    }),
    ...mapState('player', {
      musicDetail: state => state.musicDetail
    }),
    ...mapState('player', {
      isPlay: state => state.isPlay
    }),
  },
  watch: {
    // 监听 vuex 中 musicId
    '$store.state.player.musicId'(musicId) {
      // 暂停播放
      this.pauseMusic()
      // 获取 url
      this.$store.dispatch('player/getMusicUrl', musicId)
      // 1.获取vuex数据

      // 获取单曲详情
      this.$store.dispatch('player/getMusicDetailFromMusicList', musicId)
      this.currentMusicIndex = this.$store.state.player.currentMusicIndex
    },
    // 监听 vuex 中 musicList
    '$store.state.player.musicList'(musicList) {
      // 获取vuex 中的musiclist数据
      this.musicList = this.$store.state.player.musicList
      // 从歌单详情中获取歌曲详情
      this.$store.dispatch('player/getMusicDetailFromMusicList', this.$store.state.player.musicId)
    },
    // 监听播放状态
    '$store.state.player.isPlay'(isPlay) {
      if (isPlay) {
        this.playMusic()
      } else {
        this.pauseMusic()
      }
    },
    //
    '$store.state.player.currentTime'(currentTime) {
      this.currentTime = currentTime
    },
    // 监听currentIndex的变化
    '$store.state.player.currentMusicIndex'(currentMusicIndex, lastIndex) {
      if (this.hasDrawerOpend) {
        this.handleDrawerListDOM(currentMusicIndex, lastIndex)
      }
    }
  },
  filters: {
    handleMusicTime
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
    width: 223px;
    // background: red;
    overflow: hidden;
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 5px;
      overflow: hidden;
      margin-right: 10px;
      cursor: pointer;
    }
    .avatar img {
      width: 40px;
      height: 40px;
    }
    .music-info {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .music-name {
        cursor: pointer;
      }
      .music-author {
        cursor: pointer;
        font-size: 10px;
        margin-top: 5px;
        &:hover {
          text-decoration: underline;
        }

        // color: red;
      }
    }
  }
  .bar-center {
    flex: 1;
    display: flex;
    justify-content: center;
    .player-control {
      margin-top: 5px;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 320px;
      span {
        display: inline-block;
        width: 50px;
        box-sizing: border-box;
        text-align: center;
      }
      .control-btn {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 0 60px;
        justify-content: space-between;
        height: 13px;
        i {
          font-size: 20px;
          color: #313131;
        }
        span:nth-child(3) i {
          font-size: 25px;
        }
        .icon-xunhuan {
          font-size: 17px;
        }
        .icon-xihuan {
          font-size: 15px;
        }
      }
      .control-progress {
        width: 100%;
        display: flex;
        align-items: center;
        height: 15px;
        margin-top: 12px;
        overflow: hidden;
        // font-size: 12px;
        span {
          font-size: 12px;
        }
        .progressSlider {
          width: 300px;
          margin: 0 10px;
        }
      }
    }
  }
  .bar-right {
    width: 123px;
    position: relative;
    .control-list {
      display: flex;
      align-items: center;
      position: relative;
      .volumeControl {
        display: flex;
        align-items: center;
        margin-right: 15px;
      }
      .volumeSlider {
        width: 55px;
      }
      .drawerHeader {
        font-size: 12px;
        transform: scale(0.9);
        color: #aaa;
        padding: 15px 0;
      }
    }
  }
}
</style>
