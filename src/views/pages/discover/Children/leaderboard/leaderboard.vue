<template>
  <div class="leaderboard">
    <div class="official">
      <div class="title">官方榜</div>
      <!--  -->
      <div v-for="item in officialListDetail" :key="item.id">
        <list-table @clickMusicCardItem="clickMusicCardItem" @handleTrClick="handleTrClick" :officialItem="item"></list-table>
      </div>
    </div>
    <div class="worldwide">
      <div class="title">全球榜</div>
      <div class="worldwide-card">
        <music-card @clickMusicCardItem="clickMusicCardItem" v-for="item in globalList" :key="item.id" :itemData="item"></music-card>
      </div>
    </div>
  </div>
</template>

<script>
import ListTable from '@/components/list-table'
import MusicCard from '@/components/music-card/src/musicCard.vue'
import { mapState } from 'vuex'
export default {
  components: {
    ListTable,
    MusicCard
  },
  data() {
    return {}
  },
  methods: {
    // 监听 musiccard中点击回传id
    clickMusicCardItem(id) {
      // console.log(id)
      this.$router.push({ name: 'musicListDetail', params: { id } })
    },
    //  顶部展示的几个播放业务
    handleTrClick({ id, index }) {
      // console.log(id)
      // 查询歌单id
      let musicListIndex = this.$store.state.discover.officialListDetail.findIndex(item => item.id == id)
      // 获取对应歌单
      // console.log(this.officialListDetail[musicListIndex], index)
      this.$store.commit('player/changeMusicId', this.$store.state.discover.officialListDetail[musicListIndex].tracks[index].id)
      // console.log(this.officialListDetail[musicListIndex])
      // 如果歌单发生变化,则提交歌单到vuex
      if (id != this.$store.state.discover.musicListId) {
        // 将歌单传到vuex
        this.$store.commit('player/changeMusicList', this.$store.state.discover.officialListDetail[musicListIndex].tracks)
        this.$store.commit('player/changeMusicListId', id)
        
      }
    }
  },
  computed: {
    ...mapState('discover', {
      officialList: state => state.officialList
    }),
    ...mapState('discover', { globalList: state => state.globalList }),
    ...mapState('discover', { officialListDetail: state => state.officialListDetail })
  },
  async created() {
    // // 根据id查询需要展示列表的歌单详情
    // this.officialList.forEach(item => {
    //   this.getMusicListDetail(item.id)
    // })
    this.$store.dispatch('discover/getAllRankings')
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
