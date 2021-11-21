<template>
  <div class="music-card" @click="clickMusicCardItem(itemData.id)">
    <div class="card-img">
      <!-- img -->
      <img :src="(itemData.picUrl || itemData.coverImgUrl || itemData.img1v1Url) + '?param=400y400'" alt="" />
    </div>
    <div class="card-name">
      <!-- title -->
      {{ itemData.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemData: {}
  },
  data() {
    return {}
  },
  methods: {
    clickMusicCardItem(id) {
      this.$emit("clickMusicCardItem", id);
      // console.log(id);
      
    },
  }
}
</script>
<style lang="less" scoped>
.music-card {
  width: 18.4%;
  margin: 0 2% 20px 0;
  overflow: hidden;
  cursor: pointer;
  &:nth-child(5n) {
      margin-right: 0;
    }
  .card-img {
    width: 100%;
    padding-bottom: 100%;
    height: 0;
    position: relative;
    &::after {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: url('~assets/img/imgLoading.png') no-repeat center;
      background-size: contain;
      border-radius: 10px;
      z-index: -1;
    }
    img {
      width: 100%;
      border-radius: 10px;
    }
  }
  .card-name {
    margin-top: 8px;
    padding: 0 2px;
    font-size: 12px;
    color: black;
    line-height: 17px;
    /* 两行溢出 */
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
