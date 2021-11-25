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
      <div class="avatar" @click="$store.commit('changeMusicDetailCardState')">
        <img :src="musicDetail.al.picUrl" alt="" v-if="musicDetail.al" />
        <img src="../../../assets/img/test.jpg" alt="" v-else />
      </div>
      <div class="music-info" v-if="musicDetail && musicDetail.name">
        <div class="music-name">{{ musicDetail.name }}</div>
        <div class="music-author">{{ musicDetail.ar[0].name }}</div>
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
            <i class="iconfont icon-icon_play" v-if="!this.$store.state.isPlay"></i>
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
            :disabled="musicList.length == 0"
            :show-tooltip="false"
            @change="changeProgress"
          ></el-slider>
          <span class="totalTime">{{ duration }}</span>
        </div>
      </div>
    </div>
    <div class="bar-right">
      <!-- 音量 列表 -->
      <div class="control-list">
        <div class="volumeControl">
          <i class="iconfont icon-yinliang"></i>
          <el-slider class="volumeSlider" v-model="volume" :show-tooltip="false"></el-slider>
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
import { returnSecond, handleMusicTime } from '@/utils'
import ControlList from './control-list.vue'
let lastSecond = 0
// 总时长的秒数
let durationNum = 0
export default {
  components: {
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
      playType: 'order',
      volume: 30,
      drawer: false,
      currentMusicIndex: 0,
      // 抽屉是否被打开过（如果没打开过，里面的数据是不会渲染的）
      hasDrawerOpend: false,
      // 歌曲总时长
      duration: '00:00',
      // 当前播放时间位置
      currentTime: 0,
      // 进度条的位置
      timeProgress: 0,
      // 播放模式（顺序播放，随机播放）
      // order random
      playType: 'order'
    }
  },
  methods: {
    // 获取歌曲URL
    async getMusicUrl(id) {
      let result = await this.$request('/song/url', { id })
      // 将URl传入组件
      if (result.data.data[0].url == null) {
        this.$message.error('该歌曲暂无版权，将为您播放下一首歌曲')
        this.switchMusic('next')
        return
      }
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
        this.duration = this.musicList[index].dt
        // console.log(this.duration)
        // console.log(this.duration)
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
    // 播放列表
    openDrawer() {
      this.drawer = !this.drawer
      this.hasDrawerOpend = true
      this.handleDrawerListDOM(this.currentMusicIndex)
      // console.log('open')
    },
    // 当前播放的时间
    timeupdate() {
      // console.log(e);
      // console.log(this.$refs.audioPlayer.currentTime);
      // 节流
      let time = this.$refs.audioPlayer.currentTime
      // console.log(time)
      // 将当前播放时间保存到vuex  如果保存到vuex这步节流,会导致歌词不精准,误差最大有1s
      // this.$store.commit('updateCurrentTime', time)
      // console.log(time)
      time = Math.floor(time)
      // console.log(timer)
      if (time !== lastSecond) {
        // console.log(time)
        lastSecond = time
        this.currentTime = time
        // console.log(this.currentTime)
        // 计算进度条的位置
        this.timeProgress = Math.floor((time / durationNum) * 100)
        this.$store.commit('updateCurrentTime', time)

        // console.log((timer / durationNum) * 100);
      }
    },
    // 拖动进度条
    // 拖动进度条的回调
    changeProgress(e) {
      // 修改当前播放时间
      this.currentTime = Math.floor((e / 100) * durationNum)
      // 改变audio的实际当前播放时间
      this.$refs.audioPlayer.currentTime = this.currentTime
    },
    clickRow() {
      // console.log('111')
    },

    // 点击播放键的回调
    changePlayState() {
      !this.$store.state.isPlay ? this.playMusic() : this.pauseMusic()
    },
    // audio开始或暂停播放的回调  在vuex中改变状态
    changeState(state) {
      this.$store.commit('changePlayState', state)
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
      //
      durationNum = returnSecond(this.duration)
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
    },
    // 监听currentIndex的变化
    '$store.state.currentIndex'(currentIndex, lastIndex) {
      this.musicList = this.$store.state.musicList
      if (this.hasDrawerOpend) {
        this.handleDrawerListDOM(currentIndex, lastIndex)
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
