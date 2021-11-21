<template>
  <div class="control-progress">
    <span class="currentTime">{{ currentTime || handleMusicTime }}</span>
    <!-- :value 是单向的  要实现双向要v-model -->
    <el-slider class="progressSlider" v-model="value" :show-tooltip="false"></el-slider>
    <span class="totalTime">{{ duration }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
      currentTime: '03:00',
      handleMusicTime: '04:00',
      duration: '03:00'
    }
  }
}
</script>
<style lang="less" scoped>
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
</style>
