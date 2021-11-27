<template>
  <div class="recommend">
    <banner class="banner" :bannerData="banners"></banner>
    <h3>推荐歌单<i class="iconfont icon-arrow-right-bold"></i></h3>
    <div class="recommend-list">
      <music-card @clickMusicCardItem="clickMusicCardItem" v-for="item in recommendList" :key="item.id" :itemData="item"></music-card>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/banner'
import MusicCard from '@/components/music-card'
import { mapState } from 'vuex'


export default {
  components: {
    Banner,
    MusicCard
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('discover', {
      banners: state => state.banners
    }),
    ...mapState('discover', {
      recommendList: state => state.recommendList
    })
  },
  methods: {
    // 监听 musiccard中点击回传id
    clickMusicCardItem(id) {
      this.$store.commit('player/changeMusicListId', id)
      this.$router.push({ name: 'musicListDetail', params: { id } })
    }
  },
  created() {
    this.$store.dispatch('discover/getBannerData')
    this.$store.dispatch('discover/getRecommendList')
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
