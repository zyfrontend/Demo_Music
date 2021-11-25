<template>
  <div class="lyricsScroll" ref="lyrecsRef">
    <div class="placeholder"></div>
    <div class="lyricsItem" v-for="(item, index) in lyric" :key="index" :class="lyricsIndex === index ? 'active' : ''">
      {{ item[1] }}
    </div>
    <!-- 占位 -->
    <div class="placeholder"></div>
  </div>
</template>

<script>
export default {
  props: {
    lyric: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      lyricsIndex: 0
    }
  },
  methods: {
    
  },
  watch: {
    
    // 监听vuex中的musicId 重置歌词索引
    '$store.state.musicId'(musicId) {
      this.lyricsIndex = 0
    },
   
  }
}
</script>
<style lang="less" scoped>
.lyricsScroll {
  width: 100%;
  height: 275px;
  font-size: 12px;
  text-align: center;
  overflow-y: scroll;
  /* overflow: scroll; */
  &::-webkit-scrollbar {
    display: none;
  }
  .active {
    // color: white;
    font-size: 1.2rem;
    scroll-margin-top: 2rem;
    // background: red;
  }
  .lyrics::-webkit-scrollbar {
    display: none;
  }

  .lyricsItem {
    font-size: 12px;
    /* height: 20px; */
    margin: 25px 20px;
    transition: all 0.5s;
    line-height: 20px;
    text-align: center;
  }

  .currentLyric {
    font-weight: 600;
    font-size: 14px;
    color: black;
  }

  .placeholder {
    width: 100%;
    height: 40%;
  }
}
</style>
