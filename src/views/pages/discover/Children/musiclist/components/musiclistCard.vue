<template>
  <div class="musiclist-card">
    <div class="list-card" >
      <music-card v-for="item in listCardData" :key="item.id" class="card" :itemData="item"></music-card>
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
  .list-card {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0;
  }
}
</style>
