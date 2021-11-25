<template>
  <div class="musiclist">
    <musiclist-first :theFirstOfHighquality="theFirstOfHighquality"></musiclist-first>
    <!-- 导航按钮 -->
    <musiclist-menu
      :currentTag="currentTag"
      :sortList="sortList"
      @getSortList="$store.dispatch('discover/getSortList')"
      @clickSecondBarItem="clickSecondBarItem"
      :SecondNavBarData="hotTags"
      :itemWidth="0"
      @clickSortBoxItem="clickSortBoxItem"
    ></musiclist-menu>
    <!-- 列表 -->
    <div class="list-card">
      <!-- <music-card :listCardData="musicList.playlists" ></music-card> -->
      <music-card v-for="item in musicList.playlists" @clickMusicCardItem="clickMusicCardItem" :key="item.id" class="card" :itemData="item"
        >1</music-card
      >
    </div>
    <!-- 换页 -->
    <div class="page" v-if="musicList.playlists">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="musicList.total"
        :page-size="50"
        small
        :current-page="currentPage"
        @current-change="pageChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import MusiclistFirst from './components/musiclistFirst.vue'
import MusiclistMenu from './components/musiclistMenu.vue'
import MusicCard from '@/components/music-card'
export default {
  components: {
    MusiclistFirst,
    MusiclistMenu,
    MusicCard
  },
  data() {
    return {}
  },
  methods: {
    // 处理点击事件
    // 接收点击二级navbar的回调
    clickSecondBarItem(index) {
      this.$store.commit('discover/changeCurrentTag', this.$store.state.discover.hotTags[index])
      this.$store.commit('discover/changeCurrentPage', 1)
      this.$store.dispatch('discover/getMusicList')
    },
    // 点击sortBoxItem中的回调
    clickSortBoxItem(item) {
      this.$store.commit('discover/changeCurrentTag', item)
      this.$store.commit('discover/changeCurrentPage', 1)
      this.$store.dispatch('discover/getMusicList')
    },
    //当页数发生改变时
    pageChange(page) {
      this.$store.commit('discover/changeCurrentPage', page)
      this.$store.dispatch('discover/getMusicList')
    },
    // 点击歌单的回调
    clickMusicCardItem(id) {
      console.log(id)
      // this.$router.push({ name: 'musicListDetail', params: { id } })
    }
  },
  computed: {
    ...mapState('discover', {
      theFirstOfHighquality: state => state.theFirstOfHighquality
    }),
    ...mapState('discover', {
      hotTags: state => state.hotTags
    }),
    ...mapState('discover', {
      sortList: state => state.sortList
    }),
    ...mapState('discover', {
      musicList: state => state.musicList
    }),
    ...mapState('discover', {
      currentPage: state => state.currentPage
    }),
    ...mapState('discover', {
      currentTag: state => state.currentTag
    })
  },
  created() {
    this.$store.dispatch('discover/getTheFirstOfHighquality')
    this.$store.dispatch('discover/getHotTag')
    this.$store.dispatch('discover/getMusicList')
  }
}
</script>
<style lang="less" scoped>
.musiclist {
  .page {
    width: 100%;
    text-align: center;
    padding-bottom: 20px;
  }
  .list-card {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0;
  }
}
</style>
