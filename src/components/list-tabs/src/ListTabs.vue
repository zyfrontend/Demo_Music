<template>
  <div class="listTabs">
    <div class="musicdetail">
      <el-tabs v-model="activeName">
        <el-tab-pane label="歌曲列表" name="musiclist">
          <el-table
            @row-dblclick="clickRow"
            :data="musicData"
            size="mini"
            style="width: 100%"
            highlight-current-row
            stripe
            lazy
            :infinite-scroll-distance="1500"
            :infinite-scroll-immediate="false"
            :row-key="
              row => {
                return row.id
              }
            "
          >
            <el-table-column label="" width="40" type="index"></el-table-column>
            <el-table-column label="" width="23">
              <!-- 下载按钮 -->
              <i class="iconfont icon-download"></i>
            </el-table-column>
            <el-table-column prop="name" label="音乐标题" min-width="350"> </el-table-column>
            <el-table-column prop="artists[0].name" label="歌手" min-width="120"> </el-table-column>
            <el-table-column prop="album.name" label="专辑" min-width="170"> </el-table-column>
            <el-table-column prop="dt" label="时长" min-width="100"> </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="评论" name="commont"> </el-tab-pane>
        <el-tab-pane label="收藏者" name="collect"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  props: ['musicData'],
  data() {
    return {
      // eltabs 默认显示
      activeName: 'musiclist'
    }
  },
  methods: {
    // 双击table的row的回调
    async clickRow(row) {
      // 将歌单传到vuex player模块
      this.$store.commit('player/changeMusicList', this.$props.musicData)
      // 将当前双击到的歌曲id提交到vuex中 供播放组件查询歌曲url和其它操作
      this.$store.commit('player/changeMusicId', row.id)
      
    },
    // 高亮当前播放
    handleDOM(current, last) {
      // console.log(current, last)
      if (document.querySelector('.musicdetail')) {
        let tableRows = document.querySelector('.musicdetail').querySelectorAll('.el-table__row')
        // 在musiclist 中查找当前正在播放的歌曲index
        let index = this.$store.state.player.musicList.findIndex(item => item.id == current)
        if (index != -1) {
          // 直接修改dom样式的颜色无效  可能是因为第三方组件的原故
          // 通过引入全局样式解决
          // 将正在播放的音乐前面的索引换成小喇叭
          tableRows[index].children[0].querySelector('.cell').innerHTML = `<div><i class="iconfont icon-yinliang"></i></div>`
          tableRows[index].children[0].querySelector('.iconfont').classList.add('currentRow')
          tableRows[index].children[2].querySelector('.cell').classList.add('currentRow')
        }

        // 清除上一首的样式
        if (last != -1) {
          let lastIndex = this.$store.state.player.musicList.findIndex(item => item.id == last)
          if (lastIndex != -1) {
            // 将上一个播放的dom的小喇叭换回索引
            tableRows[lastIndex].children[0].querySelector('.cell').innerHTML = `<div>${
              lastIndex + 1 < 10 ? lastIndex + 1 : lastIndex + 1
            }</div>`

            // 将上一首的类名删掉  小喇叭的html已经被替换了，不需要再还原
            tableRows[lastIndex].children[2].querySelector('.cell').classList.remove('currentRow')
          }
        }
      }
    }
  },
  watch: {
    '$store.state.player.musicId'(current, last) {
      this.handleDOM(current, last)
    }
  }
}
</script>
<style lang="less" scoped>
.listTabs {
}
</style>
