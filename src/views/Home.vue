<template>
  <div class="home">
    <el-container>
      <!-- 顶部 -->
      <el-header>
        <header-bar></header-bar>
      </el-header>
      <!-- 内容区域 -->
      <el-container class="container-view">
        <!-- 侧边栏 -->
        <nav-menu></nav-menu>
        <el-main class="test">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <music-detail></music-detail>
    <player-bar class="player-bar-z"></player-bar>
  </div>
</template>

<script>
import HeaderBar from '@/components/header-bar'
import NavMenu from '@/components/nav-menu'
import PlayerBar from '@/components/player-bar'
import MusicDetail from '@/components/music-detail'
export default {
  name: 'Home',
  components: {
    HeaderBar,
    NavMenu,
    PlayerBar,
    MusicDetail
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  .container-view {
    height: 100%;
  }
  .player-bar-z {
    border-top: 1px solid #ddd;
    width: 100%;
    height: 55px;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    padding: 6px 10px;
    z-index: 10000;
    background-color: white;
  }
}
</style>
