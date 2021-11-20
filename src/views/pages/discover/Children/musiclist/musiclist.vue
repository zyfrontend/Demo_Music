<template>
  <div class="musiclist">
    <musiclist-first :theFirstOfHighquality="theFirstOfHighquality"></musiclist-first>
    <!-- 导航按钮 -->
    <musiclist-menu
      :currentTag="currentTag"
      :sortList="sortList"
      @getSortList="getSortList"
      @clickSecondBarItem="clickSecondBarItem"
      :SecondNavBarData="hotTags"
      :itemWidth="0"
      @clickSortBoxItem="clickSortBoxItem"
    ></musiclist-menu>
    <!-- 列表 -->
    <div class="list-card">
      <music-card :listCardData="musicList.playlists" @clickListCardItem="clickListCardItem"></music-card>
    </div>
    <!-- 换页 -->
    <div class="page" v-if="musicList.playlists">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="musicList.total"
        :page-size="50"
        small
        :current-page="currentPage"
        @current-change="pageChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import MusiclistFirst from './components/musiclistFirst.vue'
import MusiclistMenu from './components/musiclistMenu.vue'
import MusicCard from './components/musiclistCard.vue'
export default {
  components: {
    MusiclistFirst,
    MusiclistMenu,
    MusicCard
  },
  data() {
    return {
      theFirstOfHighquality: {},
      hotTags: [],
      musicList: {},
      currentTag: {},
      currentPage: 1,
      // 分类数据
      sortList: []
    }
  },
  methods: {
    // 处理请求事件
    // 获取高质量歌单的第一条数据
    async getTheFirstOfHighquality() {
      let result = await this.$request('/top/playlist/highquality', {
        limit: 1
      })
      //   console.log(result);
      this.theFirstOfHighquality = result.data.playlists[0]
      //   console.log(this.theFirstOfHighquality);
    },
    // 获取热门歌单tag数据
    async getHotTag() {
      let result = await this.$request('/playlist/hot')
      // console.log(result);
      this.currentTag = result.data.tags[0]
      this.hotTags = result.data.tags
    },
    // 根据歌名请求歌单列表
    async getMusicList() {
      this.musicList = {}
      let result = await this.$request('/top/playlist', {
        cat: this.currentTag.name,
        offset: 50 * (this.currentPage - 1)
      })
      // console.log(result);
      // 里面的total可以用于分页，所以把整个对象都保存下来
      this.musicList = result.data
    },

    // 获取歌单分类数据
    // 子组件 emit 事件
    async getSortList() {
      let res = await this.$request('/playlist/catlist')
      // console.log(res);
      this.sortList = res.data.sub
    },

    // 获取歌单分类数据
    async getSortList() {
      let res = await this.$request('/playlist/catlist')
      // console.log(res);
      this.sortList = res.data.sub
    },

    // 处理点击事件
    // 接收点击二级navbar的回调
    clickSecondBarItem(index) {
      // console.log(this.hotTags[index].name);
      this.currentTag = this.hotTags[index]
      this.currentPage = 1
      // 先清空musicList
      this.getMusicList()
    },
    //当页数发生改变时
    pageChange(page) {
      // page是当前页数
      // console.log(e);
      this.currentPage = page
      this.getMusicList()
    },
    // 点击歌单的回调
    clickListCardItem(id) {
      console.log(id)
      this.$router.push({ name: 'musicListDetail', params: { id } })
    },
    // 点击sortBoxItem中的回调
    clickSortBoxItem(item) {
      this.currentTag = item
      this.currentPage = 1
      this.getMusicList()
    }
  },
  async created() {
    this.getTheFirstOfHighquality()
    await this.getHotTag()
    this.getMusicList()
  }
}
</script>
<style lang="less" scoped>
.musiclist {
  .page {
    width: 100%;
    text-align: center;
    padding-bottom: 20px;
  }
  .list-card {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0;
  }
}
</style>
