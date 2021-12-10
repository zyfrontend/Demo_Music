<template>
  <div class="musicdetail">
    <detail-header :headerData="musicListDetail" @playAll="playAll"></detail-header>
    <!-- 列表 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="歌曲列表" name="musiclist">
        <el-table
          @row-dblclick="clickRow"
          :data="musicListDetail.tracks"
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
          <el-table-column prop="ar[0].name" label="歌手" min-width="120"> </el-table-column>
          <el-table-column prop="al.name" label="专辑" min-width="170"> </el-table-column>
          <el-table-column prop="dt" label="时长" min-width="100"> </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="评论" name="commont"> </el-tab-pane>
      <el-tab-pane label="收藏者" name="collect">收藏者</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DetailHeader from './components/detail-header.vue'
import { formatMinuteSecond } from '@/utils/formatDate.js'
export default {
  data() {
    return {
      // eltabs 默认显示
      activeName: 'musiclist',
    }
  },
  components: {
    DetailHeader
  },
  methods: {
    // 双击table的row的回调
    async clickRow(row) {
      // console.log(row)
      // 将当前双击到的歌曲id提交到vuex中 供播放组件查询歌曲url和其它操作
      this.$store.commit('player/changeMusicId', row.id)
      // 如果歌单发生变化,则提交歌单到vuex
      if (this.$route.params.id != this.$store.state.player.musicListId) {
        // 将歌单id传到vuex
        this.$store.commit('player/changeMusicListId', this.$route.params.id)
        // 损耗性能 毕竟数据已经请求下来了
        this.$store.dispatch('player/getMusicListDetail', this.$route.params.id)
      }
    },

    // 点击播放全部按钮的回调
    playAll() {
      // 1.把歌单第一首歌id添加到vuex中
      this.$store.commit('player/changeMusicId', this.$store.state.player.musicListDetail.tracks[0].id)
      // 2.更新歌单中歌曲列表到vuex中
      this.$store.commit('player/changeMusicListId', this.$route.params.id)
      // 3.更新歌单id
      // 损耗性能 毕竟数据已经请求下来了
      this.$store.dispatch('player/getMusicListDetail', this.$route.params.id)
    },

    // 高亮当前播放
    handleDOM(current, last) {
      // console.log(current, last)
      if (document.querySelector('.musicdetail')) {
        let tableRows = document.querySelector('.musicdetail').querySelectorAll('.el-table__row')
        // console.log(tableRows)
        // 在musiclist 中查找当前正在播放的歌曲index
        // let index = this.$store.state.player.musicListDetail.tracks.findIndex(item => item.id == current)
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
  computed: {
    ...mapState('player', {
      musicListDetail: state => state.musicListDetail
    })
  },
  created() {
    this.$store.dispatch('player/getMusicListDetail')
  },
  watch: {
    '$store.state.player.musicId'(current, last) {
      this.handleDOM(current, last)
    }
  }
}
</script>
<style lang="less" scoped>
.musicdetail {
  padding: 0 auto;
  overflow: scroll;
  height: calc(100vh - 150px);
}
</style>
