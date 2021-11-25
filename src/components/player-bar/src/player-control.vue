<template>
  <div class="player-control">
    <!-- 按钮 -->
    <div class="control-btn">
      <span><i class="iconfont icon-xunhuan" v-if="true"></i><i class="iconfont icon-suiji1" v-else></i></span>
      <span><i class="iconfont icon-shangyishou" @click="switchMusic('pre')"></i></span>
      <span>
        <i class="iconfont icon-icon_play" v-if="this.$store.state.isPlay"></i>
        <i class="iconfont icon-zantingtingzhi" v-else></i>
      </span>
      <span><i class="iconfont icon-xiayishou" @click="switchMusic('next')"></i></span>
      <span><i class="iconfont icon-xihuan"></i></span>
    </div>
    <!-- 时间进度条 -->
    <div class="control-progress">
      <span class="currentTime">{{ currentTime | handleMusicTime }}</span>
      <!-- :value 是单向的  要实现双向要v-model -->
      <el-slider class="progressSlider" v-model="atimeProgress" :show-tooltip="false" @change="changeProgress"></el-slider>
      <span class="totalTime">{{ duration }}</span>
    </div>
  </div>
</template>

<script>
import { handleMusicTime } from '@/utils'

export default {
  props: {
    // 歌曲总时长
    duration: '',
    // 进度条位置
    timeProgress: 0,
    // 当前播放时间
    currentTime: '',
    durationNum: ''
  },
  data() {
    return {
      atimeProgress: 0
    }
  },
  methods: {
    switchMusic(type) {
      // console.log(type)
      this.$emit('switchMusic', type)
    },
    changeProgress(e) {
      console.log(e)
      // 修改当前播放时间
      this.currentTime = Math.floor((e / 100) * durationNum);
      // 改变audio的实际当前播放时间
      this.$refs.audioPlayer.currentTime = this.currentTime;
      this.$emit('changeProgress', this.atimeProgress)
    }
  },
  watch: {
    timeProgress(timeProgress) {
      this.atimeProgress = timeProgress
    }
  },
  filters: {
    handleMusicTime
  }
}
</script>
<style lang="less" scoped>
.player-control {
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 320px;
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
</style>
