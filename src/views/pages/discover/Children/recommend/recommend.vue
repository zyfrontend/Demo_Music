<template>
  <div class="recommend">
    <banner class="banner" :bannerData="bannerData"></banner>
    <h3>推荐歌单<i class="iconfont icon-arrow-right-bold"></i></h3>
    <div class="recommend-list">
      <music-card @clickMusicCardItem="clickMusicCardItem" v-for="item in musicList" :key="item.id" :itemData="item"></music-card>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/banner'
import MusicCard from '@/components/music-card'

export default {
  components: {
    Banner,
    MusicCard
  },
  data() {
    return {
      bannerData: [],
      musicList: []
    }
  },
  methods: {
    // 请求轮播图数据
    async getBannerData() {
      let result = await this.$request('/banner')
      // console.log(result);
      this.bannerData = result.data.banners
    },
    // 请求推荐歌单数据的前十个
    getMusicList() {
      this.$request('/personalized', { limit: 10 }).then(res => {
        // console.log(res.data.result);
        this.musicList = res.data.result
      })
    },
    // 监听 musiccard中点击回传id
    clickMusicCardItem(id) {
      // console.log(id)
      this.$router.push({ name: "musicListDetail", params: { id } });
    }
  },
  created() {
    this.getBannerData()
    this.getMusicList()
  }
}
</script>
<style lang="less" scoped>
.recommend {
  .banner {
    margin: 0 auto;
  }
  .recommend-list {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0;
  }
}
</style>
