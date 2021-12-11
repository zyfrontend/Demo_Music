<template>
  <div class="Daily">
    <div class="daily-header">
      <div class="top">
        <calendar />
        <div class="right">
          <h2>每日歌曲推荐</h2>
          <span>根据你的音乐口味生成，每天06:00更新</span>
        </div>
      </div>
      <span class="play-all"> 播放全部 </span>
    </div>
    <list-tabs :musicData="recommendSongs"></list-tabs>
  </div>
</template>

<script>
import Calendar from "@/components/Calendar";
import ListTabs from "@/components/list-tabs";
export default {
  components: {
    Calendar,
    ListTabs,
  },
  data() {
    return {
      recommendSongs: [],
    };
  },
  created() {
    // 刷新登录状态
    // 验证是否登录
    if (!this.$store.state.login.isLogin) {
      this.$message.error("只有登录后才能进入每日推荐页面哦!");
      this.$router.replace("/discover");
    } else {
      this.$store.dispatch("daily/getRecommendSongs");
    }

    // if (!this.$store.state.login.token) {
    //   this.$message.error("只有登录后才能进入每日推荐页面哦!");
    //   this.$router.replace("/discover");
    // }else{
    // this.$store.dispatch('daily/getRecommendSongs')
    // }
  },
  watch: {
    "$store.state.daily.recommendSongs"(recommendSongs) {
      this.recommendSongs = recommendSongs;
    },
  },
};
</script>
<style lang="less" scoped>
.Daily {
  padding: 20px;
  overflow: scroll;
  height: calc(100vh - 120px);
  /* overflow: scroll; */
  &::-webkit-scrollbar {
    display: none;
  }
  .daily-header {
    .top {
      display: flex;
      align-items: center;
      margin-bottom: 30px;
      .right {
        margin-left: 20px;
        span {
          font-size: 9px;
          color: #ccc;
        }
      }
    }
    .play-all {
      background: #8e44ad;
      color: white;
      border-radius: 30px;
      font-size: 10px;
      padding: 5px 10px;
      cursor: pointer;
    }
  }
}
</style>
