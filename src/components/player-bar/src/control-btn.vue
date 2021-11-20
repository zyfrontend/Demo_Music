<template>
  <div class="control-btn">
      <span><i class="iconfont icon-xunhuan"></i><i class="iconfont icon-suiji1" ></i></span>
      <span><i class="iconfont icon-shangyishou"></i></span>
      <span>
        <i class="iconfont icon-icon_play"></i>
        <i class="iconfont icon-zantingtingzhi"></i>
      </span>
      <span><i class="iconfont icon-xiayishou"></i></span>
      <span><i class="iconfont icon-xihuan" ></i></span>
    </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.control-btn {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 60px;
  justify-content: space-between;
  height: 13px;
  i {
    font-size: 20px;
    color: #313131;
  }
  span:nth-child(3) i {
    font-size: 25px;
  }
  .icon-xunhuan {
    font-size: 17px;
  }
  .icon-xihuan {
    font-size: 15px;
  }
}
</style>
