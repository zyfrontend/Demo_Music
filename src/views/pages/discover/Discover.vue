<template>
  <div class="discover">
    <nav-bar @clickBarItem="clickBarItem" :navBarItem="navBarData"></nav-bar>
    <router-view class="discover-view"></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
export default {
  components: {
    NavBar
  },
  data() {
    return {
      navBarData: [
        { name: '个性推荐', path: '/discover/recommend' },
        { name: '歌单', path: '/discover/musiclist' },
        { name: '排行榜', path: '/discover/ranking' },
        { name: '歌手', path: '/discover/singer' }
      ]
    }
  },
  methods: {
    // 接收navbar传来的点击事件
    clickBarItem(path) {
      // 路由跳转
      this.$router.push(path)
    }
  }
}
</script>

<style lang="less" scoped>
.discover {
  overflow: hidden;
  padding: 0 !important;
  height: 100%;
}
.discover-view {
  padding: 0 auto;
  overflow: scroll;
  height: calc(100vh - 220px);
  /* overflow: scroll; */
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
