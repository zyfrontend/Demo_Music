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
      <div class="drawerHeader">总 {{musicList.length}} 首</div>
      <el-table :data="musicList" stripe style="width: 100%" :show-header="false" @row-dblclick="clickRow" highlight-current-row lazy>
        <el-table-column prop="name" width="150px"> </el-table-column>
        <el-table-column prop="ar[0].name" width="80px"> </el-table-column>
        <el-table-column prop="dt" width="70px"> </el-table-column>
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
      musicList: [],
      currentMusicIndex: 0,
    }
  },
  methods: {
    openDrawer() {
      this.drawer = !this.drawer
      // console.log('open')
    },
    clickRow() {
      // console.log('111')
    },
     // 操作drawerList中DOM的函数
    handleDrawerListDOM(currentIndex, lastIndex) {
      // 目前没什么好思路 直接操作原生DOM
      this.$nextTick(() => {
        let tableRows = document
          .querySelector(".control-list")
          .querySelectorAll(".el-table__row");
        // // 直接修改dom样式的颜色无效  可能是因为第三方组件 style scoped的原因
        // // 通过引入全局样式解决
        console.log(tableRows);
        
        if (tableRows[currentIndex]) {
          tableRows[currentIndex].children[0]
            .querySelector(".cell")
            .classList.add("currentRow");
          tableRows[currentIndex].children[1]
            .querySelector(".cell")
            .classList.add("currentRow");
        }
        if (
          (lastIndex && lastIndex != -1 && tableRows[lastIndex]) ||
          lastIndex == 0
        ) {
          // 将上一首的类名删掉
          tableRows[lastIndex].children[0]
            .querySelector(".cell")
            .classList.remove("currentRow");
          tableRows[lastIndex].children[1]
            .querySelector(".cell")
            .classList.remove("currentRow");
        }
      });
    },
  },
  watch:{
    '$store.state.musicList'(musicList){
      this.musicList = this.$store.state.musicList
      // console.log(musicList)
    },
    // 监听currentIndex的变化
    "$store.state.currentIndex"(currentIndex, lastIndex) {
      this.musicList = this.$store.state.musicList
      if (this.hasDrawerOpend) {
        this.handleDrawerListDOM(currentIndex, lastIndex);
      }
    },
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
