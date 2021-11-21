<template>
  <div class="musicdetail">
    <detail-header :headerData="musicListDetail"></detail-header>
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
import DetailHeader from './components/detail-header.vue'
import { formatMinuteSecond } from '@/utils/formatDate.js'
export default {
  data() {
    return {
      activeName: 'musiclist',
      musicListDetail: {},
      comments: {},
      // 当前评论页数
      currentCommentPage: 1,
      // 是否还有更多音乐
      isMore: false,
      // 用户是否收藏了当前歌单
      isSub: false,
      // 是否是用户创建的歌单
      isCreated: false,
      // 评论是否在加载
      isCommentLoading: false,
      // 是否禁止滚动加载
      scrollLoadDisabled: false,
      // 收藏者列表的变量
      followedsListData: {
        // 当前页数
        currentPage: 1,
        // 列表
        followedsList: [],
        // 是否还有更多
        isMore: false,
        // 是否已经加载过列表数据 （用于点击收藏者tab后第一次加载数据）
        isLoaded: false
      }
    }
  },
  components: {
    DetailHeader
  },
  methods: {
    // 根据传来的 id 查询歌单
    async getMusicListDetail() {
      var timestamp = Date.parse(new Date())
      // console.log(this.$route.params.id);
      let result = await this.$request('/playlist/detail', {
        id: this.$route.params.id,
        timestamp
      })
      // console.log(result);
      this.musicListDetail = result.data.playlist
      // console.log(this.musicListDetail);
      // 判断是否还有更多音乐
      if (this.musicListDetail.tracks.length != this.musicListDetail.trackIds.length) {
        this.isMore = true
      }
      // 处理播放时间
      this.musicListDetail.tracks.forEach((item, index) => {
        this.musicListDetail.tracks[index].dt = formatMinuteSecond(item.dt)
      })
      // 判断用户是否喜欢该音乐
      // 直接两个循环性能损耗太厉害了 没什么思路暂时不做先
      // let likeMusicList = this.$store.state.likeMusicList;
    },
    // 双击table的row的回调
    async clickRow(row) {
      // console.log(row)
      // 将musicId提交到vuex中 供bottomControl查询歌曲url和其它操作
      this.$store.commit("updateMusicId", row.id);
      // 如果歌单发生变化,则提交歌单到vuex
      if (this.musicListDetail.id != this.$store.state.musicListId) {
        // 将歌单传到vuex
        this.$store.commit("updateMusicList", {
          // 列表
          musicList: this.musicListDetail.tracks,
          // 列表id
          musicListId: this.musicListDetail.id,
        });
      }

    },
  },
  async created() {
    await this.getMusicListDetail()
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
