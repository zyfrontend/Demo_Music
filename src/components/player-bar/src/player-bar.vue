<template>
  <div class="player-bar">
    <div class="bar-left">
      <!-- img -->
      <div class="avatar">
        <!-- <img
          :src="musicDetail.al.picUrl"
          alt=""
          v-if="musicDetail.al"
        /> -->
        <img src="../../../assets/img/test.jpg" alt=""/>
      </div>
    </div>
    <div class="bar-center">
      <!-- 控件 -->
      <player-control></player-control>
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
    return {}
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
