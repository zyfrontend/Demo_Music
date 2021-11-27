<template>
  <div class="header-bar">
    <div class="left">
      <div class="buttons">
        <i class="iconfont icon-arrow-left-bold back" @click="$router.go(-1)"></i>
        <i class="iconfont icon-arrow-right-bold forward" @click="$router.go(1)"></i>
      </div>
    </div>
    <div class="center">
      <div class="title" @click="$router.replace('/')">
        ZY_music
      </div>
    </div>
    <div class="right">
      <div class="login-btn" @click="$warn()" type="info">登录</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.header-bar {
  display: flex;
  width: 100%;
  background: #8e44ad;
  height: 65px;
  align-items: center;
    padding: 0 3rem;
  .buttons {
    color: rgb(235, 235, 235);
    /* display: flex; */
    height: 22px;
    display: flex;
  }
  .center{
    flex: 1;
    .title {
      color: white;
      text-align: center;
      cursor: pointer;
    }
  }
  .buttons i {
    background-color: #9b59b6;
    font-size: 12px;
    transform: scale(0.8);
    padding: 5px;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    margin: 0 3px;
  }
  .right {
    .login-btn{
      color: white;
      padding: 5px 10px;
      border-radius: 10px;
      background: #9b59b6;
      cursor: pointer;
    }
  }
}
</style>
