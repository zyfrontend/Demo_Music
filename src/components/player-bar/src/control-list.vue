<template>
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
      <div class="drawerHeader">总 100 首</div>
      <el-table :data="musicList" stripe style="width: 100%" :show-header="false" @row-dblclick="clickRow" highlight-current-row lazy>
        <!-- <el-table-column prop="name" width="150px"> </el-table-column>
        <el-table-column prop="ar[0].name" width="80px"> </el-table-column>
        <el-table-column prop="dt" width="70px"> </el-table-column> -->
      </el-table>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      volume: 30,
      drawer: false,
      musicList: ''
    }
  },
  methods: {
    openDrawer() {
      this.drawer = !this.drawer
      // console.log('open')
    },
    clickRow() {
      console.log('111')
    }
  }
}
</script>
<style lang="less" scoped>
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
</style>
