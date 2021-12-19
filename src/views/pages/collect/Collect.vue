<template>
  <div class="Collect">
    <music-card
        v-for="item in UserPlayList"
        :key="item.id"
        :itemData="item"
        @clickMusicCardItem="clickMusicCardItem"
    ></music-card>
  </div>
</template>

<script>
import {mapState} from "vuex";
import MusicCard from "@/components/music-card";
export default {
  name: "Collect",
  components: {
    MusicCard
  },
  computed:{
    ...mapState('collect', {
      UserPlayList: state=> state.UserPlayList
    })
  },
  methods:{
    // 监听 musiccard中点击回传id
    clickMusicCardItem(id) {
      this.$store.commit("player/changeMusicListId", id);
      this.$router.push({ name: "musicListDetail", params: { id } });
    },
  },
  created(){
    // this.$store.dispatch('login/getLoginState')
    if(!this.$store.state.login.isLogin){
      this.$message.error("只有登录后才能进入个人歌单页面哦!")
      this.$router.push('/')
    }else{
    //  获取个人歌单
      this.$store.dispatch('collect/getUserMusicList')
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
          this.$message.error("只有登录后才能进入个人歌单页面哦!")
          this.$router.push('/')
        }
      },
    }
  }

}
</script>

<style lang="less" scoped>
.Collect {
  padding: 0 auto;
  overflow: scroll;
  height: calc(100vh - 155px);
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
  /* overflow: scroll; */
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>