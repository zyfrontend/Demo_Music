<template>
  <div class="musiclist-card">
    <div class="list-card" v-for="item in listCardData" :key="item.id">
      <music-card class="card" :itemData="item"></music-card>
    </div>
  </div>
</template>

<script>
import MusicCard from '@/components/music-card'
export default {
  props: {
    listCardData: {
      type: Array,
      default() {
        return []
      }
    },
    // 是否使用上拉触底事件
    isLoad: {
      type: Boolean,
      default() {
        return false
      }
    }
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
.musiclist-card {
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
  .list-card {
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
