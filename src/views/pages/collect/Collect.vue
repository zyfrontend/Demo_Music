<template>
  <div class="Collect">
    <music-card v-for="item in userMusicList" :key="item.id" :itemData="item" @clickMusicCardItem="clickMusicCardItem"></music-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MusicCard from '@/components/music-card'
export default {
  data() {
    return {}
  },
  components: {
    MusicCard
  },
  computed: {
    ...mapState('collect', {
      userMusicList: state => state.userMusicList
    })
  },
  methods: {
    // 监听 musiccard中点击回传id
    clickMusicCardItem(id) {
      this.$store.commit('player/changeMusicListId', id)
      this.$router.push({ name: 'musicListDetail', params: { id } })
    }
  },
  async created() {
    await this.$store.dispatch('login/refreshLogin')
    // 验证是否登录
    if (!this.$store.state.login.isLogin) {
      this.$message.error('只有登录后才能进入每日推荐页面哦!')
      this.$router.replace('/discover')
      return
    } else {
      this.$store.dispatch('collect/getUserMusicList')
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
