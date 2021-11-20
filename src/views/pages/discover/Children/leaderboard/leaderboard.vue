<template>
  <div class="leaderboard">
    <div class="official">
      <div class="title">官方榜</div>
      <!--  -->
      <div v-for="item in officialListDetail" :key="item.id">
        <list-table :officialItem="item"></list-table>
      </div>

      <list-table> </list-table>
    </div>
    <div class="worldwide">
      <div class="title">全球榜</div>
      <div class="worldwide-card">
        <music-card v-for="item in globalList" :key="item.id" :itemData="item"></music-card>
      </div>
    </div>
  </div>
</template>

<script>
import ListTable from '@/components/list-table'
import MusicCard from '@/components/music-card/src/musicCard.vue'

export default {
  components: {
    ListTable,
    MusicCard
  },
  data() {
    return {
      // 歌单封面等信息
      officialList: [],
      // 歌单列表等信息
      officialListDetail: [],
      // 全球榜
      globalList: []
    }
  },
  methods: {
    // 请求所有榜单
    async getAllRankings() {
      let res = await this.$request('/toplist')
      // console.log(res.data.list)
      this.officialList = res.data.list.slice(0, 4)
      this.globalList = res.data.list.slice(4)
    },

    // 根据榜单id请求详细数据
    // 根据传来的 id 查询歌单
    async getMusicListDetail(id) {
      // console.log(this.$route.params.id);
      let result = await this.$request('/playlist/detail', { id })
      // console.log(result)
      result = result.data.playlist
      // 对时间进行处理
      // result.tracks.forEach((item, index) => {
      //   result.tracks[index].dt = handleMusicTime(item.dt)
      // })
      this.officialListDetail.push(result)
    }
  },
  async created() {
    // 获取歌单信息
    await this.getAllRankings()
    // console.log(this.officialList)
    // 根据id查询需要展示列表的歌单详情
    this.officialList.forEach(item => {
      this.getMusicListDetail(item.id)
    })
  }
}
</script>
<style lang="less" scoped>
.leaderboard {
  .title {
    margin-top: 8px;
    padding: 0 2px;
    font-size: 12px;
    color: black;
    line-height: 17px;
    /* 两行溢出 */
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .worldwide-card {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0;
  }
}
</style>
