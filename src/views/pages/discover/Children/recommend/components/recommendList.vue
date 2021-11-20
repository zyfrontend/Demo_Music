<template>
  <div class="recommendList">
    <div class="music-card-box" v-for="item in musicList" :key="item.id">
      <music-card :itemData="item"></music-card>
    </div>
  </div>
</template>

<script>
import MusicCard from '@/components/music-card'
export default {
  props: {
    musicList: []
  },
  components: {
    MusicCard
  },
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.recommendList {
  margin: 20px 10px;
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
  .music-card-box {
    width: 18.4%;
    margin: 0 2% 20px 0;
    overflow: hidden;
    cursor: pointer;
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>
