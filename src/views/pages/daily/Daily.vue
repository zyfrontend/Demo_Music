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
    <list-tabs :musicData="dailyList"></list-tabs>
  </div>
</template>

<script>
import ListTabs from "@/components/list-tabs";
import Calendar from "@/components/Calendar";
import {mapState} from "vuex/dist/vuex.esm.browser";
export default {
  name: "Daily",
  components:{
    ListTabs,
    Calendar
  },
  data(){
    return {
      // dailyList: []
    }
  },
  computed:{
    ...mapState('daily', {
      dailyList: state=> state.dailyList
    })
  },
  created(){
    // this.$store.dispatch('login/getLoginState')
    if(!this.$store.state.login.isLogin){
      this.$message.error("只有登录后才能进入每日推荐页面哦!")
      this.$router.push('/')
    }else{
      // 获取每日推荐数据
      this.$store.dispatch('daily/getDailyRecommendList')
    }
  },
  watch:{
    /*
    * 监听 store 中 isLogin
    * !isLogin = false 不做操作
    *          = true 重定向
    * */
    '$store.state.login.isLogin':{
      handler: function (isLogin){
         if(!isLogin) {
            this.$message.error("只有登录后才能进入每日推荐页面哦!")
            this.$router.push('/')
         }
      }
    },
    // '$store.state.daily.dailyList'(dailyList){
    //     this.dailyList = dailyList
    // }
  }


}
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