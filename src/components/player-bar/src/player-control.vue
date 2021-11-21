<template>
  <div class="player-control">
    <div class="control-btn">
      <span><i class="iconfont icon-xunhuan" v-if="true"></i><i class="iconfont icon-suiji1" v-else></i></span>
      <span><i class="iconfont icon-shangyishou" @click="switchMusic('pre')"></i></span>
      <span>
        <i class="iconfont icon-icon_play" v-if="this.$store.state.isPlay"></i>
        <i class="iconfont icon-zantingtingzhi" v-else></i>
      </span>
      <span><i class="iconfont icon-xiayishou"  @click="switchMusic('next')"></i></span>
      <span><i class="iconfont icon-xihuan"></i></span>
    </div>
    <control-progress></control-progress>
  </div>
</template>

<script>
import ControlBtn from './control-btn.vue'
import ControlProgress from './control-progress.vue'
export default {
  components: {
    ControlBtn,
    ControlProgress
  },
  data() {
    return {}
  },
  methods: {
    switchMusic(type){
      // console.log(type)
      this.$emit("switchMusic", type)
    }
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
}
</style>
