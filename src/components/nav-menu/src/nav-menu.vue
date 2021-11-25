<template>
  <div class="nav-menu">
    <el-aside width="160px">
      <el-menu active-text-color="black" router :default-active="defaultActive">
        <el-menu-item index="/discover">
          <i class="iconfont icon-yinle"></i>
          <span slot="title">发现音乐</span>
        </el-menu-item>
        <el-menu-item index="/video" @click="$warn()">
          <i class="iconfont icon-shipin"></i>
          <span slot="title">视频</span>
        </el-menu-item>
        <el-menu-item index="/favorites" @click="$warn()">
          <i class="iconfont icon-more"></i>
          <span slot="title">收藏</span>
        </el-menu-item>
        <el-menu-item index="/recommendmusic" @click="$warn()"> 
          <i class="iconfont icon-good"></i>
          <span slot="title">每日推荐</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
  </div>
</template>
<script>
export default {
  data() {
    return {
      defaultActive: ''
    }
  }
}
</script>
<style lang="less" scoped>
.nav-menu {
  height: calc(100vh-65px) !important;
  .el-menu {
    height: 100% !important;
  }
  .el-aside {
    height: 100%;
  }
}
</style>
