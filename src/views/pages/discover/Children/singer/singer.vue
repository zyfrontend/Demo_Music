<template>
  <div class="singer">
    <singer-category></singer-category>
    <div class="singer-card">
      <music-card v-for="item in singerList" :key="item.id" :itemData="item"></music-card>
    </div>
  </div>
</template>

<script>
import MusicCard from '@/components/music-card/src/musicCard.vue'
import SingerCategory from './components/singer-category.vue'
export default {
  components: {
    SingerCategory,
    MusicCard
  },
  data() {
    return {
      area: -1,
      type: -1,
      initial: -1,
      // 当前所在页数
      currentPage: 1,
      singerList: [],
      // 是否还有更多数据
      isMore: false
    }
  },
  methods: {
    // 请求歌手列表
    async getSingerList() {
      let res = await this.$request('/artist/list', {
        type: this.type,
        area: this.area,
        initial: this.initial,
        offset: (this.currentPage - 1) * 30
      })
      // console.log(res)
      this.singerList.push(...res.data.artists)
      this.isMore = res.data.more
    }
  },
  created() {
    this.getSingerList()
    // console.log(this.singerList)
  }
}
</script>
<style lang="less" scoped>
.singer {
  .singer-card {
    display: flex;
    flex-wrap: wrap;
    
  }
}
</style>
