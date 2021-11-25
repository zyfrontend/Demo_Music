<template>
  <el-tab-pane class="music-list" label="歌曲列表" :name="musiclist">
    <el-table :data="listData" size="mini" style="width: 100%" >
      <el-table-column label="" width="40" type="index" :index="handleIndex"></el-table-column>
      <el-table-column label="" width="23">
        <!-- 下载按钮 -->
        <i class="iconfont icon-download"></i>
      </el-table-column>
      <el-table-column prop="name" label="音乐标题" min-width="350"> </el-table-column>
      <el-table-column prop="ar[0].name" label="歌手" min-width="120"> </el-table-column>
      <el-table-column prop="al.name" label="专辑" min-width="170"> </el-table-column>
      <el-table-column prop="dt" label="时长" min-width="100"> </el-table-column>
    </el-table>
  </el-tab-pane>
</template>

<script>
export default {
  props: {
    listData: {}
  },
  data() {
    return {}
  },
  methods: {
    // 事件函数
    handleIndex(index) {
      // console.log(index);
      index += 1
      if (index < 10) {
        return '0' + index
      } else {
        return index
      }
    }
  }
}
</script>
<style lang="less" scoped>
.music-list {
}
</style>
