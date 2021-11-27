<template>
  <div class="lyricsScroll" ref="lyricsRef">
    <div class="placeholder"></div>
    <div class="lyricsItem" v-for="(item, index) in lyric" :key="index" :class="lyricsIndex === index ? 'active' : ''">
      {{ item.content }}
    </div>
    <!-- 占位 -->
    <div class="placeholder"></div>
  </div>
</template>

<script>
import { scrollTo } from '@/utils'
export default {
  props: {
    lyric: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      // 当前播放到的歌词
      lyricsIndex: 0
    }
  },
  methods: {
    scrollLyrics() {
      if (this.lyricsIndex > 0 && this.lyricsIndex < 3) return
      scrollTo(this.$refs.lyricsRef, (this.lyricsIndex - 2) * 50, 300)
    }
  },
  computed: {},
  watch: {
    '$store.state.player.currentTime'(currentTime) {
      const data = this.$props.lyric

      // 获取当前播放到的歌词索引
      for (let i = 0; i < data.length; i++) {
        if (currentTime < data[i].time / 1000) {
          this.lyricsIndex = i - 1
          break
        }
      }

      // 歌词滚动
      this.scrollLyrics()
    }
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
    font-size: 1.2rem !important;
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
