<template>
  <div class="recommend">
    <banner class="banner" :bannerData="bannerData"></banner>
    <div>
      <h3>推荐歌单<i class="iconfont icon-arrow-right-bold"></i></h3>
      <recommend-list :musicList="musicList"></recommend-list>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/banner'
import RecommendList from './components/recommendList.vue'
export default {
  components: {
    Banner,
    RecommendList
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
}
</style>
